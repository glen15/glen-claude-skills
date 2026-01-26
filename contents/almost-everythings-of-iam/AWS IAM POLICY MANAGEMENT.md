# AWS IAM 정책 관리 방법

Owner: 최민철
Verification: 인증 완료

> 본 문서는 교육/해커톤/MSP 환경에서 고객들에게 제한된 권한을 부여하기 위한 IAM 커스텀 정책 관리 방법을 설명합니다.
> 
- 1. IAM 기본 개념
    - Identity and Access Management: AWS 리소스에 대한 접근을 안전하게 제어하는 서비스
        - “누가(Who)”, “무엇을(What)”, “어떤 조건에서(Under what conditions)” 할 수 있는지를 정의
    - 핵심 구성 요소
        
        
        | 구성 요소 | 설명 | 예시 |
        | --- | --- | --- |
        | **User** | - AWS에 접근하는 개별 사용자 
        - 네이밍 컨벤션: `{group_name}-{idx}` (소문자) | 학생 계정 (`kusj-ai-01`) |
        | **Group** | - 동일한 권한을 가진 User들의 집합 
        - 네이밍 컨벤션: `{조직명}-({목작})` (소문자) | `kusj-ai` |
        | **Role** | AWS 서비스나 외부 사용자가 임시로 사용하는 권한 | EC2가 S3에 접근할 때 사용하는 역할 |
        | **Policy** | 권한을 정의하는 JSON 문서 | `SafePowerUser.json` |
    - 권한의 주체: 크게 두 가지
        - 사용자와 서비스
            
            ```mermaid
            flowchart TD
                %% 스타일 정의
                %% color:#000000 (검정색), font-weight:bold (굵게) 추가
                classDef human fill:#E1F5FE,stroke:#01579B,stroke-width:2px,color:#000000,font-weight:bold;
                classDef aws fill:#FFF3E0,stroke:#FF6F00,stroke-width:2px,color:#000000,font-weight:bold;
                classDef auth fill:#F3E5F5,stroke:#7B1FA2,stroke-width:2px,stroke-dasharray: 5 5,color:#000000,font-weight:bold;
            
                %% 메인 그룹
                subgraph Principals ["권한이 필요한 주체 (Principals)"]
                    direction LR
                    
                    %% 1. 사람 (왼쪽)
                    subgraph HumanSection ["사용자 (User)"]
                        direction TB
                        User(kusj-ai-01):::human
                    end
            
                    %% 2. 서비스 (오른쪽)
                    subgraph ServiceSection ["서비스 (AWS Service)"]
                        direction TB
                        Service("Lambda / EC2"):::aws
                    end
                end
            
                %% 권한 할당 방식
                Policy["IAM Policy<br/>(권한 정책 문서)"]:::auth
                Role["IAM Role<br/>(역할)"]:::auth
            
                %% 연결선
                User -->|"직접 연결"| Policy
                User -->|"Assume Role<br/>(역할 획득)"| Role
                Service -->|"Assume Role<br/>(역할 획득)"| Role
                
                %% 설명 추가
                Role -->|"정책 포함"| Policy
            ```
            
        - 서비스에 Role이 필요한 이유: Lambda 함수가 S3 버킷에서 파일을 읽어야 한다면?
            - Lambda 자체는 아무 권한이 없음
            - Lambda에 **Role**을 연결하고, 그 Role에 S3 읽기 권한을 부여해야 함
                
                ```mermaid
                flowchart LR
                    %% 스타일 정의 (기존 테마 유지 + 가독성 강화)
                    classDef aws fill:#FFF3E0,stroke:#FF6F00,stroke-width:2px,color:#000000,font-weight:bold;
                    classDef auth fill:#F3E5F5,stroke:#7B1FA2,stroke-width:2px,stroke-dasharray: 5 5,color:#000000,font-weight:bold;
                
                    %% 노드 정의
                    Lambda("Lambda Function"):::aws
                    Role("LambdaExecutionRole<br/>(Role)"):::auth
                    Policy("S3ReadOnlyAccess<br/>(Policy)"):::auth
                
                    %% 연결선 정의
                    %% Lambda -> Role은 '연결/부여' (실선)
                    Lambda -->|"연결"| Role
                    
                    %% Role -> Policy는 '포함/참조' (점선)
                    Role -.->|"포함"| Policy
                ```
                
            - EC2 전용: Instance Profile
                - EC2는 다른 서비스와 달리 Role을 **직접 연결할 수 없음**
                - 대신 **Instance Profile**이라는 래퍼(wrapper)를 통해 Role을 연결 (레거시)
                    
                    ```mermaid
                    flowchart LR
                        %% 스타일 정의 (기존 테마 유지 + 가독성 강화)
                        classDef aws fill:#FFF3E0,stroke:#FF6F00,stroke-width:2px,color:#000000,font-weight:bold;
                        classDef auth fill:#F3E5F5,stroke:#7B1FA2,stroke-width:2px,stroke-dasharray: 5 5,color:#000000,font-weight:bold;
                    
                        %% [Row 1] 최신 방식 (가로 흐름)
                        Modern_Node("Lambda / ECS"):::aws
                        Modern_Role("IAM Role"):::auth
                        
                        %% 연결선 정의
                        Modern_Node -->|"직접 연결"| Modern_Role
                        
                        %%[Row 2] EC2 방식 (가로 흐름)
                        Legacy_Node("EC2 Instance"):::aws
                        Profile("Instance Profile<br/>(프로파일/껍데기)"):::profile
                        Legacy_Role("IAM Role"):::auth
                        
                        %% 연결선 정의
                        Legacy_Node -->|"연결"| Profile
                        Profile -.->|"포함"| Legacy_Role
                    ```
                    
    - **핵심: User의 권한만 제어하면 끝이 아니다!**
        - User의 권한만 제한하고 Role을 제어하지 않으면 **권한 상승(**Privilege Escalation) 문제 발생 가능
        - 공격 시나리오
            
            ```mermaid
            flowchart TD
                %% 1. 스타일 정의 (기존 테마 유지 + 줄바꿈 방지)
                classDef user fill:#E1F5FE,stroke:#01579B,stroke-width:2px,color:#000000,font-weight:bold,text-align:left,white-space:nowrap;
                classDef aws fill:#FFF3E0,stroke:#FF6F00,stroke-width:2px,color:#000000,font-weight:bold,text-align:center,white-space:nowrap;
                classDef auth fill:#F3E5F5,stroke:#7B1FA2,stroke-width:2px,stroke-dasharray: 5 5,color:#000000,font-weight:bold,text-align:center,white-space:nowrap;
                classDef danger fill:#FFEBEE,stroke:#D32F2F,stroke-width:3px,color:#D32F2F,font-weight:bold,text-align:center,white-space:nowrap;
                classDef note fill:#FAFAFA,stroke:#9E9E9E,stroke-width:1px,color:#616161,font-size:12px,text-align:left;
            
                %% 2. 전체 시나리오 컨테이너
                subgraph AttackPath ["권한 상승 공격 경로"]
                    direction TB
            
                    %% [Step 1] 공격자 (User)
                    subgraph AttackerScope ["1. 공격자 (초기 상태)"]
                        direction LR
                        
                        User("kusj-ai-01<br/>(User)"):::user
                        UserPerms["보유 권한:<br/>- ec2:RunInstances<br/>- iam:PassRole (*)<br/>(직접 권한은 제한적)"]:::note
                        
                        %% 설명 연결
                        UserPerms -.- User
                    end
            
                    %% [Step 2] 악용된 리소스 (EC2 + Admin Role)
                    subgraph ExploitedScope ["2. 취약점 악용"]
                        direction LR
                        EC2("EC2 Instance"):::aws
                        AdminRole("AdministratorAccess<br/>(Role)"):::auth
                        
                        %% EC2가 Role을 가짐
                        EC2 -->|"연결 (AssumeRole)"| AdminRole
                    end
            
                    %% [Step 3] 최종 결과 (위험)
                    Result("3. S3, RDS, IAM 등 모든 리소스 접근 가능<br/>(User 권한 우회 성공)"):::danger
            
                    %% 3. 단계별 흐름 연결 (Action Arrows)
                    User -->|"① EC2 인스턴스 생성<br/>+ AdministratorAccess Role 연결 (PassRole)"| EC2
                    EC2 -->|"② EC2에 SSH 접속 후<br/>AWS CLI 사용<br/>(EC2의 Role 권한으로 실행)"| Result
                end
            ```
            
        - 방어 전략
            - User의 직접 권한 제어 ✓
            - User가 사용할 수 있는 Role도 제어 ✓ ← **이것도 필수!**
                
                ```mermaid
                flowchart TD
                    %% 1. 스타일 정의
                    %% 기본 스타일 (User, AWS, Role)
                    classDef user fill:#E1F5FE,stroke:#01579B,stroke-width:2px,color:#000000,font-weight:bold,text-align:center,white-space:nowrap;
                    classDef aws fill:#FFF3E0,stroke:#FF6F00,stroke-width:2px,color:#000000,font-weight:bold,text-align:center,white-space:nowrap;
                    classDef auth fill:#F3E5F5,stroke:#7B1FA2,stroke-width:2px,stroke-dasharray: 5 5,color:#000000,font-weight:bold,text-align:center,white-space:nowrap;
                    
                    %% [New] 방어/안전 스타일 (초록색 강조)
                    classDef safe fill:#E8F5E9,stroke:#2E7D32,stroke-width:2px,color:#1B5E20,font-weight:bold,text-align:left,font-size:13px;
                
                    %% 2. 전체 컨테이너
                    subgraph DefenseStrategy ["Defense Strategy"]
                        direction TB
                
                        %% [Step 1] 사용자 정의 (권한 제한)
                        subgraph UserScope ["1. 사용자 (권한 제한 적용)"]
                            direction LR
                            User("kusj-ai-01<br/>(User)"):::user
                            
                            %% 권한 설명 (핵심 방어 로직)
                            DefensePolicy["🛡️ 권한 정책 (Policy):<br/>- ec2:RunInstances<br/>- iam:PassRole<br/>#nbsp;#nbsp;- SafeRole-kusj-ai-01만 허용!"]:::safe
                            
                            User -.- DefensePolicy
                        end
                
                        %% [Step 2] 실행 및 결과
                        subgraph ResultScope ["2. EC2 생성 및 Role 연결 결과"]
                            direction LR
                            EC2("EC2 Instance"):::aws
                            SafeRole("SafeRole-kusj-ai-01<br/>(제한된 권한만 포함)"):::auth
                            
                            %% EC2 -> Role 연결
                            EC2 -->|"AssumeRole"| SafeRole
                        end
                
                        %% 3. 흐름 연결 (액션 및 차단 로직 설명)
                        User -->|"① EC2 인스턴스 생성 시도<br/>✅ SafeRole-kusj-ai-01<br/>❌ AdministratorAccess"| EC2
                    end
                ```
                
    - `iam:PassRole` 심층 이해
        - **IAM Role을 AWS 서비스에 전달하는 권한 (vs. `iam:AttachXYZ` 와 헷갈리지 않도록 주의)**
            - PassRole을 제어하지 않으면 다음 공격이 가능
                
                ```
                1. User가 AdministratorAccess Role이 연결된 Lambda 함수 생성
                2. Lambda 함수 내에서 AWS CLI로 관리자 작업 수행
                3. **User의 직접 권한과 무관하게** 모든 작업 가능
                ```
                
        - 동작 원리
            
            ```mermaid
            flowchart TD
                %% 1. 스타일 정의 (기존 테마 유지)
                classDef user fill:#E1F5FE,stroke:#01579B,stroke-width:2px,color:#000000,font-weight:bold,text-align:center;
                classDef role fill:#F3E5F5,stroke:#7B1FA2,stroke-width:2px,stroke-dasharray: 5 5,color:#000000,font-weight:bold,text-align:center;
                classDef aws fill:#FFF3E0,stroke:#FF6F00,stroke-width:2px,color:#000000,font-weight:bold,text-align:center;
                classDef note fill:#212121,stroke:#FFFFFF,stroke-width:1px,color:#FFFFFF,text-align:left,font-size:13px;
            
                %% 2. 상단 설명 (Note 스타일)
                Description["💡 <b>핵심 개념:</b><br/>User가 직접 Role을 '사용'하는 것이 아님!<br/>User가 서비스에게 Role을 '전달'하여 서비스가 그 Role로 동작하게 함"]:::note
            
                %% 3. 메인 로직 그룹
                subgraph PassRoleLogic ["PassRole 메커니즘"]
                    direction LR
            
                    User("User<br/>kusj-ai-01"):::user
                    Role("Role<br/>SafeRole"):::role
                    
                    %% [핵심] User가 Role을 전달 (가로 흐름)
                    User -->|"PassRole<br/>(전달)"| Role <-->|"PassRole(→)<br/>(←)Assume Role"| EC2
                end
                
                 %% 하단 레이어 (EC2)
                EC2("EC2 Instance<br/>(SafeRole의 권한으로 동작)"):::aws
            
                %% 설명과 그래프 연결 (레이아웃 정렬용 투명 링크)
                Description ~~~ PassRoleLogic
            ```
            
            - PassRole vs. AssumeRole
                
                
                | 구분 | iam:PassRole | sts:AssumeRole |
                | --- | --- | --- |
                | 주체 | User가 서비스에 Role 전달 | User/서비스가 직접 Role로 전환 |
                | 결과 | 서비스가 Role 권한 획득 | 요청자가 임시 자격증명 획득 |
                | 사용 예 | Lambda 생성 시 실행 Role 지정 | Cross-account 접근, Role switching |
        - PassRole이 필요한 상황: AWS 서비스가 권한을 주고 싶을 때
            
            
            | 상황 | 예시 |
            | --- | --- |
            | EC2 인스턴스에 IAM Role 연결 | `aws ec2 run-instances --iam-instance-profile {profile_name}` |
            | Lambda 함수 생성 | `aws lambda create-function --role {role_name}`  |
            | ECS Task Definition 생성 | Task Role, Execution Role 지정 |
            | Step Functions 생성 | State Machine에 실행 Role 지정 |
        - 넥클 PassRole 정책 (`SafePowerUser.json`)
            
            ```json
            {
              "Effect": "Allow",
              "Action": "iam:PassRole",
              "Resource": [
                // AWS가 자동 생성하는 서비스 역할 (검토 필요)
                "arn:aws:iam::*:role/service-role/*",          
                // 넥클 어드민이 사전 생성한 역할 (네이밍 컨벤션으로 Nxt prefix)
                "arn:aws:iam::*:role/Nxt-*",
                // 사용자 전용 안전 역할                    
                "arn:aws:iam::*:role/SafeRole-${aws:username}" 
              ],
              "Condition": {
                "StringLike": {
                  "iam:PassedToService": [
                    "lambda.amazonaws.com",
                    "ec2.amazonaws.com",
                    "apigateway.amazonaws.com",
                    "bedrock.amazonaws.com",
                    // ... 허용된 서비스 목록
                  ]
                }
              }
            }
            ```
            
    - 방어 전략 종합
        
        
        | 방어 수단 | 설명 | 관련 정책 |
        | --- | --- | --- |
        | IAM Write 권한 제한 | `iam:Create*`, `iam:Delete*` 차단(Deny) | `SafePowerUser.json` |
        | Role 사전 생성 |  `SafeRole-{username}` 형태로 미리 생성 | 수동 관리 |
        | PassRole 제한 | 특정 Role만 전달 가능하도록 제한 | `SafePowerUser.json` |
        | Instance Profile 제한 | `ec2:NewInstanceProfile` 조건으로 제한 | `ControlOnlyOwnResources.json` |
- 2. IAM 정책의 본질과 구조
    - 정책: 특정 주체(Principal)가 특정 자원(Resource)에 특정 행위(Action)를 할 수 있는지(Allow) 없는지(Deny)를 조건(Condition)과 함께 정의한 규칙
        
        ```mermaid
        flowchart TD
            %% 1. 스타일 정의
            %% 컴포넌트 박스 (흰색 배경, 검은 테두리, 왼쪽 정렬)
            classDef component fill:#FFFFFF,stroke:#333333,stroke-width:1px,color:#000000,text-align:left;
            
            %% Action 박스 (가운데 정렬 강조)
            classDef action fill:#F5F5F5,stroke:#333333,stroke-width:1px,color:#000000,font-weight:bold,text-align:center;
            
            %% 전체 컨테이너 (점선 테두리)
            classDef container fill:#F9F9F9,stroke:#666666,stroke-width:2px,stroke-dasharray: 5 5,color:#000000;
        
            %% 2. 전체 구조 그룹
            subgraph PolicyStructure ["IAM Policy Structure"]
                direction TB
        
                %% [Top] Action
                ActionNode("Action<br/>(무엇을 하는가)"):::action
        
                %% [Middle] Principal -> Resource (가로 배치)
                subgraph SubjectObject [" "]
                    direction LR
                    Principal("<b>Principal</b><br/>(누가)<br/>──────────<br/>• User<br/>• Role<br/>• Service"):::component
                    Resource("<b>Resource</b><br/>(무엇에 대해)<br/>──────────<br/>• S3 버킷<br/>• EC2 인스턴스<br/>• Lambda 함수"):::component
                    
                    %% 누가 -> 무엇에게
                    Principal --> Resource
                end
        
                %% [Bottom 1] Effect
                Effect("<b>Effect</b><br/>(허용 or 거부)<br/>──────────<br/>• Allow<br/>• Deny"):::component
        
                %% [Bottom 2] Condition
                Condition("<b>Condition</b><br/>(언제/어떤 조건)<br/>──────────<br/>• 특정 리전에서만<br/>• MFA 인증 시만<br/>• 특정 IP에서만"):::component
        
                %% 3. 전체 흐름 연결
                ActionNode --> SubjectObject
                SubjectObject --> Effect
                Effect --> Condition
            end
        
            %% 스타일 적용 (컨테이너)
            class PolicyStructure container
        ```
        
    - Identity-based Policy vs. Resource-based Policy
        
        
        | 구분 | Identity-based Policy | Resource-based Policy |
        | --- | --- | --- |
        | 연결 대상 | User, Group, Role | S3, SQS, Lambda 등 리소스 |
        | Principal | 생략 (연결된 대상이 주체) | **명시 필수** |
        | 예시 | 이 문서의 대부분 정책 | S3 버킷 정책, SQS 정책 |
        - **우리가 주로 다루는 정책**: Identity-based Policy (User/Group에 연결하는 정책)
    - 정책 기본 구조
        
        ```json
        {
          "Version": "2012-10-17", // 항상 이 값. 이게 최신 버전이기 때문.
          "Statement": [ // 권한 규칙의 배열
            {
              "Sid": "ID(고유식별자). 필수 X. 직관적인 id는 가독성, 유지관리에 좋음",
              "Principal": "액션의 주체",
              "Action": "허용/거부할 AWS 작업. 리스트로 작성 가능",
              "Resource": "대상 리소스. 리스트로 작성 가능. 일부 Action은 * 필수",
              "Effect": "Allow 또는 Deny",
              "Condition": { 
        	      "조건": { 
        		      "키": "값" 
        		    } 
        		  } // 필수 조건 아님. 자원마다 지원하는 조건이 다름. 공식 문서에서 확인 필수
            }
          ]
        }
        ```
        
    - Action 작성법
        
        ```json
        // 단일 Action
        "Action": "s3:GetObject"
        
        // 복수 Action (배열)
        "Action": [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject"
        ]
        
        // 와일드카드 사용
        "Action": "s3:*"           // S3의 모든 작업
        "Action": "ec2:Describe*"  // ec2:DescribeInstances, ec2:DescribeVpcs 등
        // Read Operation은 * 사용 권장 (예: Get*, List*)
        "Action": "*"              // 모든 AWS 작업
        
        // NotAction (지정한 Action 제외한 나머지)
        "NotAction": "iam:*"       // IAM을 제외한 모든 작업
        ```
        
    - Resource 작성법
        
        ```json
        // 모든 리소스
        "Resource": "*"
        
        // 특정 S3 버킷
        "Resource": "arn:aws:s3:::my-bucket"
        
        // 버킷 내 모든 객체
        "Resource": "arn:aws:s3:::my-bucket/*"
        
        // 버킷과 객체 모두
        "Resource": [
          "arn:aws:s3:::my-bucket",
          "arn:aws:s3:::my-bucket/*"
        ]
        
        // 정책 변수 사용 (사용자별 리소스)
        "Resource": "arn:aws:s3:::${aws:username}*"
        
        // NotResource (지정한 Resource 제외한 나머지)
        "NotResource": "arn:aws:s3:::admin-bucket/*"
        ```
        
- 3. Condition 작성법 (핵심)
    
    > Condition은 정책의 핵심입니다. 우리 고객 환경에서 가장 많이 사용하는 패턴들을 설명합니다.
    > 
    - Condition 기본 구조
        
        ```json
        "Condition": {
          "조건연산자": {
            "조건키": "값"
          }
        }
        ```
        
    - 주요 조건 연산자
        
        
        | 연산자 | 설명 | 사용 예 |
        | --- | --- | --- |
        | `StringEquals` | 문자열 정확히 일치 | 리전, 태그값 비교 |
        | `StringNotEquals` | 문자열 불일치 | 특정 값 제외 |
        | `StringLike` | 와일드카드(*,?) 패턴 매칭 | 인스턴스 타입 패턴 |
        | `StringNotLike` | 패턴 불일치 | 특정 패턴 제외 |
        | `Bool` | Boolean 값 비교 | MFA 사용 여부 |
        | `Null` | 키 존재 여부 | 태그 존재 확인 |
        | `ArnEquals` | ARN 정확히 일치 | 특정 역할/정책 |
        | `ForAnyValue` | 배열 중 하나라도 일치 | 여러 태그 키 중 하나 |
        | `ForAllValues` | 배열 모두 일치 | 모든 조건 만족 |
    - 조건키의 종류
        
        
        | 글로벌 조건키 
        (Global Condition Keys) | - **모든 AWS 서비스에서 사용 가능**
        - ****`aws:` 접두사로 시작
        - 항상 지원 |  |
        | --- | --- | --- |
        |  | - `aws:username`                              
        - `aws:RequestedRegion`                 
        - `aws:MultiFactorAuthPresent`    
        - `aws:ResourceTag/태그키`              
        - `aws:RequestTag/태그키`                
        - `aws:TagKeys`                                
        - `aws:ViaAWSService`                     
        - `aws:SourceIp`                              
        - `aws:PrincipalArn`                       | 현재 IAM 사용자 이름 
        요청한 AWS 리전  
        MFA 인증 여부 
        리소스에 붙은 태그 값   
        요청에 포함된 태그 값  
        요청에 포함된 태그 키들 
        AWS 서비스를 통한 요청 여부 
        요청자의 IP 주소
        요청자의 ARN    |
        | 서비스별 조건키 
        (Service-Specific Condition Keys) | - **특정 서비스에서만 사용 가능**
        - 서비스 접두사(ec2:, rds: 등)로 시작
        - **Action마다 지원 여부 다름** |  |
        |  | - `ec2:InstanceType`          
        - `rds:DatabaseEngine`                  - `rds:DatabaseClass`                    
        - `rds:MultiAz`                               
        - `iam:PassedToService`                
        - `s3:prefix`                                   
        - `lambda:FunctionArn`                   | EC2 인스턴스 타입
        RDS 데이터베이스 엔진
        RDS 인스턴스 클래스
        Multi-AZ 배포 여부
        PassRole 대상 서비스
        S3 객체 키 접두사
        Lambda 함수 ARN        |
    - 서비스별 조건키 사용 시 주의사항
        - **서비스별 조건키는 모든 Action에서 지원되지 않음!**
        - 예시
            - `ec2:InstanceType`은 `ec2:RunInstances`에서는 사용 가능
            - 하지만 `ec2:DescribeInstances`에서는 사용 **불가**
        - 잘못된 조건키를 사용하면 **조건이 무시되어 의도치 않은 허용/거부가 발생**
        - [**AWS 공식 문서**](https://docs.aws.amazon.com/service-authorization/latest/reference/list_amazonec2.html) 참조 필수
            - 새 정책을 작성할 때는 **반드시** 공식 문서에서 해당 서비스와 Action이 지원하는 조건키를 확인
            - 예: EC2 정책을 작성 시
                1. 위 문서에서 EC2 검색
                2. 사용하려는 Action (예: `RunInstances`) 찾기
                3. 해당 Action에서 지원하는 Condition Keys 확인
                4. 지원하는 키만 사용하여 정책 작성
        - **리소스 속성 vs. 요청 속성 조건키**
            - **조건키 구분**
                - **“현재 리소스 상태”를 평가하는 키**
                - **“요청에 포함된 값”을 평가하는 키**
            - **핵심**: 리소스의 “현재 상태”를 제어할지, “변경하려는 값”을 제어할지 명확히 구분하고 적절한 조건키를 사용
            - 예시: EC2 인스턴스 타입 제어
                
                
                | 조건키 | 평가 대상 | 사용 시점 |
                | --- | --- | --- |
                | `ec2:InstanceType` | 인스턴스의 **현재** 타입 
                (리소스 속성) | RunInstances, StartInstances 등 |
                | `ec2:Attribute/InstanceType` | **변경하려는** 타입 값 
                (요청 속성) | ModifyInstanceAttribute |
            - 잘못된 정책 예시
                
                ```json
                // ❌ 이 정책은 의도대로 동작하지 않음!
                {
                  "Effect": "Allow",
                  "Action": "ec2:ModifyInstanceAttribute",
                  "Resource": "*",
                  "Condition": {
                    "StringEquals": {
                      "ec2:InstanceType": [  // 현재 타입만 체크함!
                	      "t3.micro", 
                	      "t3.small"
                	    ]  
                    }
                  }
                }
                ```
                
                - 위 정책은 **현재 t3.micro 또는 t3.small인 인스턴스**의 속성 변경만 허용
                - 하지만 사용자가 어떤 타입으로 **변경하려는지**는 체크하지 않음 (심지어 다른 속성도 변경 가능)
            - 올바른 정책 예시
                
                ```json
                // ✅ 변경하려는 타입을 제한하는 올바른 정책
                {
                  "Sid": "AllowModifyToSpecificInstanceTypes",
                  "Effect": "Deny",
                  "Action": "ec2:ModifyInstanceAttribute",
                  "Resource": "*",
                  "Condition": {
                    "StringNotEquals": {
                      "ec2:Attribute/InstanceType": [
                        "t3.nano",
                        "t3.micro",
                        "t3.small",
                        "t3.medium"
                      ]
                    }
                  }
                }
                ```
                
        - 다른 서비스의 유사 패턴
            
            
            | 서비스 | 리소스 속성 조건키 | 요청 속성 조건키 |
            | --- | --- | --- |
            | EC2 | `ec2:InstanceType` | `ec2:Attribute/InstanceType` |
            | RDS | `rds:DatabaseClass` | (ModifyDBInstance에서는 직접 지원 안 함) |
            | Lambda | `lambda:FunctionArn` | (요청값 조건키 제한적) |
    - 실전 Condition 패턴
        - 패턴 1: 리전 제한
            - 서울 리전에서만 작업 허용 (글로벌 서비스 제외)
            
            ```json
            {
              "Sid": "DenyAlmostOutsideSeoul",
              "Effect": "Deny",
              "NotAction": [
                "iam:*",
                "cloudfront:*",
                "route53:*",
                "s3:ListAllMyBuckets"
              ],
              "Resource": "*",
              "Condition": {
                "StringNotEquals": {
                  "aws:RequestedRegion": "ap-northeast-2"
                }
              }
            }
            ```
            
            - **해설**:
                - `NotAction`으로 글로벌 서비스는 예외 처리
                - `StringNotEquals`로 서울 리전이 아니면 Deny
        - 패턴 2: 인스턴스 타입 제한
            - 비싼 EC2 인스턴스 생성 차단
            
            ```json
            {
              "Sid": "DenyEc2Expensive",
              "Effect": "Deny",
              "Action": "ec2:RunInstances",
              "Resource": "arn:aws:ec2:*:*:instance/*",
              "Condition": {
                "StringNotLike": {
                  "ec2:InstanceType": [
                    "t3.nano",
                    "t3.micro",
                    "t3.small",
                    "t3.medium",
                    "t3.large"
                  ]
                }
              }
            }
            ```
            
            - **해설**: t3 시리즈만 허용, 나머지는 전부 차단
        - 패턴 3: MFA 필수
            - MFA 없이 로그인하면 대부분의 작업 차단
            
            ```json
            {
              "Sid": "BlockMostAccessUnlessSignedInWithMFA",
              "Effect": "Deny",
              "NotAction": [
                "iam:CreateVirtualMFADevice",
                "iam:EnableMFADevice",
                "iam:ChangePassword"
              ],
              "Resource": "*",
              "Condition": {
                "Bool": {
                  "aws:MultiFactorAuthPresent": "false",
                  "aws:ViaAWSService": "false"
                }
              }
            }
            ```
            
            - **해설**:
                - `aws:ViaAWSService`: false → 사용자의 직접 요청만 차단 (서비스 간 호출은 허용)
                - MFA 등록에 필요한 Action은 `NotAction`으로 예외 처리
        - 패턴 4: 자기 리소스만 제어 (태그 기반)
            - 자신이 만든 리소스만 조작 가능
            
            ```json
            {
              "Sid": "ControlOnlyMine",
              "Effect": "Allow",
              "Action": [
                "ec2:TerminateInstances",
                "ec2:StopInstances",
                "ec2:StartInstances"
              ],
              "Resource": "*",
              "Condition": {
                "StringEquals": {
                  "aws:ResourceTag/username": "${aws:username}"
                }
              }
            }
            ```
            
            ```json
            {
              "Sid": "DenyControlOthers",
              "Effect": "Deny",
              "Action": [
                "ec2:TerminateInstances",
                "ec2:StopInstances"
              ],
              "Resource": "*",
              "Condition": {
                "StringNotEquals": {
                  "aws:ResourceTag/username": "${aws:username}"
                },
                "Null": {
                  "aws:ResourceTag/username": "false"
                }
              }
            }
            ```
            
            - **해설**:
                - `${aws:username}`: 정책 변수, 실행 시점의 사용자 이름으로 치환
                - `Null` 조건: 태그가 존재하는 리소스에만 적용 (태그 없는 리소스는 다른 정책으로 처리)
        - 패턴 5: 태그 변조 방지
            - 비용 추적용 태그 수정 차단
            
            ```json
            {
              "Sid": "DenyCostAllocationTagManagement",
              "Effect": "Deny",
              "Action": [
                "ec2:CreateTags",
                "ec2:DeleteTags",
                "lambda:TagResource",
                "lambda:UntagResource"
              ],
              "Resource": "*",
              "Condition": {
                "ForAnyValue:StringEquals": {
                  "aws:TagKeys": [
                    "username",
                    "group"
                  ]
                }
              }
            }
            ```
            
            - **해설**: `username`, `group` 태그는 관리자만 수정 가능
        - 패턴 6: PassRole 제한
            - 역할 전달 대상 서비스 제한
            
            ```json
            {
              "Effect": "Allow",
              "Action": "iam:PassRole",
              "Resource": [
                "arn:aws:iam::*:role/SafeRole-${aws:username}",
                "arn:aws:iam::*:role/service-role/*"
              ],
              "Condition": {
                "StringLike": {
                  "iam:PassedToService": [
                    "lambda.amazonaws.com",
                    "ec2.amazonaws.com",
                    "apigateway.amazonaws.com"
                  ]
                }
              }
            }
            ```
            
            - **해설**:
                - 자기 역할 또는 service-role만 전달 가능
                - Lambda, EC2, API Gateway에만 역할 전달 허용
- 4. 넥클 정책 파일 구성
    - 정책 파일 목록 및 용도
        
        
        | 파일명 | 용도 | 적용 대상 |
        | --- | --- | --- |
        | `RestrictRegion*.json` | 특정 리전으로 작업 제한 | 과정별 선택 적용 |
        | `ControlOnlyOwnResources.json` | 본인 리소스만 조작 가능 | 해커톤, 공용 계정 |
        | `SafePowerUser.json` | 안전한 PowerUser 권한 | Default |
        | `IAMBasicAccess.json` | IAM 조회 + 본인 비밀번호 변경 | 모든 학생 |
        | `IAMAdvancedAccess.json` | MFA, SSH키, Git 자격증명 관리 | 고급 과정 |
        | `DenyAllWithoutMFA.json` | MFA 필수 적용 | 보안 중시 환경 |
        | `IAMAdvancedExpert.json` | AWS Access Key 허용 | 개발자, 숙련자 |
    - 일반적인 정책 조합
        
        
        | **환경** | 정책 조합 |
        | --- | --- |
        | 기본 환경 | SafePowerUser + 
        RestrictRegionVirginia + 
        ControlOnlyOwnResources +
        IAMBasicAccess |
        | 보안 강화 환경 | SafePowerUser + 
        RestrictRegionVirginia + 
        ControlOnlyOwnResources +
        IAMBasicAccess +
        IAMAdvanced |
        | 보안 심화 환경 | SafePowerUser + 
        RestrictRegionVirginia + 
        ControlOnlyOwnResources +
        IAMBasicAccess +
        DenyAllWithoutMFA |
- 5. 정책 작성 및 적용 가이드
    - 새 정책 작성 절차
        1. **요구사항 정의**: 무엇을 허용/차단할지 명확히
        2. **기존 정책 검토**: 비슷한 정책이 있는지 확인
        3. **JSON 작성**: 본 문서의 패턴 참고
        4. **정책 검증**: AWS Policy Simulator 또는 IAM Access Analyzer 사용
        5. **테스트 계정 적용**: 프로덕션 전 충분히 테스트
        6. **문서화**: 정책 목적과 적용 대상 기록
    - 정책 검증 방법
        
        ```bash
        # AWS CLI로 정책 문법 검증
        aws accessanalyzer validate-policy \
          --policy-document file://DenyOverkill.json \
          --policy-type IDENTITY_POLICY
        ```
        
    - 흔한 실수와 해결책
        
        
        | 실수 | 증상 | 해결책 |
        | --- | --- | --- |
        | Resource에 `*` 누락 | 정책이 동작 안 함 | 서비스별 필수 Resource 확인 |
        | NotAction 오용 | 의도치 않은 허용 | Allow+NotAction 조합 주의 |
        | 조건키 오타 | 조건 무시됨 | AWS 문서에서 정확한 키 확인 |
        | 정책 크기 초과 | 저장 실패 | 6,144자 제한, 정책 분리 필요 |
    - 참고 자료
        - [IAM 글로벌 조건키 전체 목록](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html)
        - [서비스별 Actions, Resources, Condition Keys](https://docs.aws.amazon.com/service-authorization/latest/reference/)
        - [IAM Policy Simulator](https://policysim.aws.amazon.com/)
- 6. 자주 묻는 질문 (FAQ)
    - Q1: Allow와 Deny 정책이 충돌하면?
        - Deny가 항상 우선합니다. 하나의 정책에서 Allow하고 다른 정책에서 Deny하면 최종 결과는 Deny입니다.
    - Q2: NotAction과 Deny를 같이 쓰면?
        - **지정한 Action을 제외한 나머지를 Deny**라는 의미입니다. 그러나 지정한 Action이 **자동으로 허용(Allow)되는 것은 아닙니다**.
            
            ```json
            // 아래 두 정책은 동일한 효과
            { "Effect": "Deny", "NotAction": "s3:GetObject" }
            // = s3:GetObject를 제외한 나머지는 전부 거부
            // s3:GetObjet에 대한 Allow 정책이 별도로 적용된 경우, 허용
            // 아닌 경우, 묵시적 거부(Implicit Deny)
            ```
            
        - 정책 평가 순서
            1. **명시적 Deny** → 무조건 거부 (최우선)
            2. **명시적 Allow** → 허용
            3. **암묵적 Deny** → 기본값 (아무 정책도 없으면 거부)
                
                ```mermaid
                flowchart TD
                    %% 1. 스타일 정의
                    %% 기본 박스 (질문/단계)
                    classDef step fill:#FFFFFF,stroke:#333333,stroke-width:1px,color:#000000;
                    
                    %% 허용 (초록색)
                    classDef allow fill:#E8F5E9,stroke:#2E7D32,stroke-width:2px,color:#1B5E20,font-weight:bold;
                    
                    %% 명시적 거부 (강한 빨간색)
                    classDef deny fill:#FFEBEE,stroke:#D32F2F,stroke-width:2px,color:#D32F2F,font-weight:bold;
                    
                    %% 암묵적 거부 (회색/빨간 점선 - 기본값임을 강조)
                    classDef implicit fill:#FAFAFA,stroke:#616161,stroke-width:2px,stroke-dasharray: 5 5,color:#D32F2F,font-weight:bold;
                
                    %% 2. 노드 정의
                    Start["요청 발생"]:::step
                    
                    %% 마름모꼴(decision)은 {} 사용
                    CheckDeny{"명시적 Deny 있음?"}:::step
                    CheckAllow{"명시적 Allow 있음?"}:::step
                
                    %% 결과 노드
                    ResultDeny["❌ 거부"]:::deny
                    ResultAllow["✅ 허용"]:::allow
                    ResultImplicit["❌ 거부<br/>(암묵적 Deny)"]:::implicit
                
                    %% 3. 흐름 연결
                    Start --> CheckDeny
                
                    %% Deny 체크 분기
                    CheckDeny -- "Yes" --> ResultDeny
                    CheckDeny -- "No" --> CheckAllow
                
                    %% Allow 체크 분기
                    CheckAllow -- "Yes" --> ResultAllow
                    CheckAllow -- "No" --> ResultImplicit
                ```
                
    - Q3: 정책 변수 `${aws:username}`이 동작 안 해요
        - 정책 변수는 특정 컨텍스트에서만 동작합니다.
            
            
            | Resource ARN | 사용 가능 |
            | --- | --- |
            | Condition | 사용 가능 |
            | Action | 사용 불가 |
    - Q4: 새 서비스가 나오면 기존 정책은?
        - `NotAction`이나 와일드카드를 사용한 정책은 새 서비스에도 자동 적용됩니다. 새 서비스를 허용하려면 정책 업데이트가 필요합니다.
    - Q5: 태그 기반 접근 제어가 동작 안 해요
        - 아래 사항을 확인합니다.
            - 리소스에 태그가 실제로 존재하는지
            - 태그 키의 대소문자가 정확한지
            - **서비스가 태그 기반 조건을 지원하는지 (참고: [AWS 공식문서](https://docs.aws.amazon.com/service-authorization/latest/reference/list_amazonbedrockagentcore.html))**
    - Q6: `StringEquals` vs `StringLike` 언제 어떤 걸 쓰나요?
        
        
        | `StringEquals` | **정확히 일치**해야 함. 와일드카드 미지원 |
        | --- | --- |
        | `StringLike` | **패턴 매칭** 지원. `*`(0개 이상), `?`(1개) 사용 가능 |
        
        ```json
        // StringEquals - 정확히 "t3.micro"만 매칭
        "StringEquals": { 
          "ec2:InstanceType": "t3.micro" 
        }
        
        // StringLike - t3로 시작하는 모든 타입 매칭
        "StringLike": { 
          "ec2:InstanceType": "t3.*" 
        }
        ```
        
    - Q7: 조건키를 지원하지 않는 Action에 조건을 걸면?
        - **조건이 무시되고 무조건 허용/거부됩니다!** 이것이 IAM 정책의 가장 위험한 함정입니다.
            
            ```json
            // ❌ 위험! ec2:DescribeInstances는 ec2:InstanceType 조건을 지원 안 함
            {
              "Effect": "Allow",
              "Action": "ec2:DescribeInstances",
              "Resource": "*",
              "Condition": {
                "StringEquals": { "ec2:InstanceType": "t3.micro" }  // 무시됨!
              }
            }
            // 결과: 모든 인스턴스 조회 가능 (조건 없는 것과 동일)
            ```
            
    - Q8: `Null` 조건은 언제 쓰나요?
        - 태그나 속성의 **존재 여부**를 확인할 때 사용합니다.
            
            ```json
            // 태그가 있는 리소스에만 적용
            "Condition": {
              "Null": {
                "aws:ResourceTag/username": "false"  // 태그가 존재하면(null이 아니면) true
              }
            }
            
            // 태그가 없는 리소스에만 적용
            "Condition": {
              "Null": {
                "aws:ResourceTag/username": "true"   // 태그가 없으면(null이면) true
              }
            }
            ```
            
    - Q9: Allow + NotAction vs Deny + Action, 어떤 게 더 안전한가요?
        - Deny + Action이 항상 더 안전합니다.
            
            
            | 방식 | 특징 | 신규 서비스 |
            | --- | --- | --- |
            | `Allow` + `NotAction` | 지정한 Action 외 모두 허용 | 자동 허용 ⚠️ |
            | `Deny` + `Action` | 지정한 Action만 거부 | 영향 없음 ✅ |
            
            ```json
            // ⚠️ 신규 서비스가 추가되면 자동으로 허용됨
            { "Effect": "Allow", "NotAction": ["iam:*"], "Resource": "*" }
            
            // ✅ 명시적으로 거부한 것만 차단, 나머지는 다른 정책에서 허용 필요
            { "Effect": "Deny", "Action": ["iam:*"], "Resource": "*" }
            ```
            
        - 단, 서비스 전체를 차단(예: iam:*)하지 않아야 나중에 일부 기능(권한)을 부여할 때 고민이 줄어듭니다.
    - Q10: 조건이 평가될 수 없으면 어떻게 되나요?
        - **조건을 평가할 수 없으면 조건 불일치(mismatch)로 처리되어 해당 Statement가 적용되지 않습니다**. 공허하게 참(vacuous truth)이 아닙니다.
        - 조건 평가 불가 상황
            
            
            | Action이 해당 조건키를 지원하지 않음 | `ec2:DescribeInstances`에서 `ec2:InstanceType` 사용 |
            | --- | --- |
            | 조건키는 지원하지만 값이 존재하지 않음 | 태그 없는 리소스에서 `aws:ResourceTag/username` 사용 |
            - 예시: "이 사람의 이름이 Jack이 아닌가?" (StringNotEquals)
                - 이름 = "Tom" → "네, Jack이 아닙니다" → true (조건 충족)
                - 이름 = "Jack" → "아니요, Jack입니다" → false (조건 불충족)
                - 이름표 없음 → "판단 불가" → mismatch (Statement 무시)
        - **실무적 함의**: 태그 기반 Deny 정책에서 태그 없는 리소스도 차단하려면 별도 Statement가 필요
            
            ```json
            {
                "Sid": "DenyUntagged",
                "Effect": "Deny",
                "Action": [...],
                "Resource": "*",
                "Condition": {
                    "Null": { "aws:ResourceTag/username": "true" }
                }
            }
            ```
            
    - Q11: 여러 Condition을 쓰면 AND인가요 OR인가요?
        
        
        | 구분 | Evaluation |
        | --- | --- |
        | 같은 블록 내 다른 조건키 | AND |
        | 같은 조건키 내 여러 값 | OR (암묵적으로 배열처럼 동작) |
        | ForAnyValue | 배열 중 하나라도 일치하면 true (OR) |
        | ForAllValues | 배열 모두 일치해야 true (AND) |
        - 조건 연산자 간에는 AND
            
            ```json
            "Condition": {
              "StringEquals": {
                "aws:RequestedRegion": "ap-northeast-2",     // 조건키 1
                "ec2:InstanceType": [     // 조건키 2 (micro OR small)
            	    "t3.micro", 
            	    "t3.small"
            	   ] 
              }
              // 조건1 AND 조건2 모두 만족해야 함
            }
            ```
            
        - 다른 조건 연산자 블록 간에도 AND
            
            ```json
            "Condition": {
              "StringEquals": {
                "aws:RequestedRegion": "ap-northeast-2"
              },
              "StringLike": {
                "s3:prefix": "logs/*"
              },
              "IpAddress": {
                "aws:SourceIp": "10.0.0.0/8"
              }
            }
            
            // 평가 로직:
            // (리전 = ap-northeast-2) 
            //    AND 
            // (prefix가 logs/*로 시작) 
            //    AND 
            // (IP가 10.0.0.0/8 대역)
            ```
            
        - For(Any/All)Value가 무의미한 경우
            - `ModifyInstanceAttribute` 호출 시 인스턴스 타입은 하나만 지정
            
            ```json
            {
                "Sid": "AllowEC2TypeRange",
                "Effect": "Allow",
                "Action": "ec2:ModifyInstanceAttribute",
                "Resource": "arn:aws:ec2:*:*:instance/*",
                "Condition": {
                    "ForAnyValue:StringEquals": {
                        "ec2:Attribute/InstanceType": [
                            "t3.nano",
                            "t3.micro",
                            "t3.small",
                            "t3.medium"
                        ]
                    }
                }
            }
            ```
            
        - For(Any/All)Value가 의미 있는 경우
            - **요청 값 자체가 배열일 때만**
                
                ```json
                // 태그 생성 시 여러 키를 한번에 요청 가능
                // 요청: TagKeys = ["Environment", "Project", "Owner"]
                "ForAnyValue:StringEquals": {
                    "aws:TagKeys": ["Environment", "Product"]  // 셋 중 하나라도 Environment면 true
                }
                ```
                
    - Q12: 왜 ec2:RunInstances에는 여러 Resource ARN이 필요한가요?
        - EC2 인스턴스 생성 시 여러 리소스가 동시에 관여하기 때문입니다.
            
            ```json
            {
              "Effect": "Allow",
              "Action": "ec2:RunInstances",
              "Resource": [
                "arn:aws:ec2:*:*:instance/*",          // 생성될 인스턴스
                "arn:aws:ec2:*::image/ami-*",          // 사용할 AMI
                "arn:aws:ec2:*:*:key-pair/*",          // SSH 키페어
                "arn:aws:ec2:*:*:network-interface/*", // 네트워크 인터페이스
                "arn:aws:ec2:*:*:security-group/*",    // 보안 그룹
                "arn:aws:ec2:*:*:subnet/*",            // 서브넷
                "arn:aws:ec2:*:*:volume/*"             // EBS 볼륨
              ]
            }
            ```
            
        - 위 모든 리소스에 대한 권한이 있어야 인스턴스 생성이 성공합니다.
            - [**AWS 공식문서**](https://docs.aws.amazon.com/service-authorization/latest/reference/list_amazonec2.html)에서 `Runinstances`의 **Dependent actions** 참고
    - Q13: PassRole 없이 Lambda를 생성하면?
        - `iam:PassRole` 권한 없이 Lambda 함수를 생성하려고 하면 다음 오류가 발생합니다.
            
            ```json
            User: arn:aws:iam::123456789012:user/kusj-ai-01 is not authorized to perform: iam:PassRole on resource: arn:aws:iam::123456789012:role/my-lambda-role
            // 람다 함수는 생성 시 Role을 함께 지정해야 함
            ```
            
        - Lambda, EC2 (Instance Profile 사용 시), ECS, Step Functions 등 서비스에 Role을 연결하는 모든 작업에서 `iam:PassRole`이 필요합니다.
- 7. 주니어 개발자를 위한 체크리스트
    - 정책 작성 전 확인사항
        - [ ]  사용하려는 조건키가 해당 Action에서 지원되는지 공식 문서에서 확인했는가?
        - [ ]  Allow + NotAction 대신 Deny + Action을 사용할 수 있는지 검토했는가?
        - [ ]  리소스의 “현재 상태”를 제어할지, “변경하려는 값”을 제어할지 명확한가?
        - [ ]  ForAnyValue/ForAllValues가 필요한 (요청이) 다중 값 조건키인지 확인했는가?
        - [ ]  PassRole이 필요한 작업인지 확인했는가?
        - [ ]  태그 기반 정책에서 Null 조건을 추가해야 하는지 검토했는가?
    - 정책 테스트 시 확인사항:
        - [ ]  IAM Policy Simulator로 의도한 대로 동작하는지 확인했는가?
        - [ ]  허용되어야 할 작업이 허용되는가? (긍정 테스트)
        - [ ]  거부되어야 할 작업이 거부되는가? (부정 테스트)
        - [ ]  Edge case (태그 없는 리소스, 새로운 인스턴스 타입 등)를 테스트했는가?
- 부록
    - 정책의 종류
        
        
        | 정책 | 설명 | 비고 |
        | --- | --- | --- |
        | AWS 관리형 정책
        AWS Managed) | AWS가 사전 정의한 정책 
        예: AmazonS3ReadOnlyAccess    | 비교적 관대함 |
        | 고객 관리형 정책
        Customer Managed)  | 우리가 직접 만든 정책 ← 이 문서의 주제
        예: DenyOverkill.json | tag (managedBy: nxtcloud)로 다른 사용자가 조회 불가하게 관리 |
        | 인라인 정책
        (Inline)  | 특정 User/Group/Role에 직접 연결 
        재사용 불가, 권장하지 않음         | 사용자마다 발급하는 SafeRole에 사용  |
    - ARN 형식
        
        ```
        arn:aws:서비스:리전:계정ID:리소스타입/리소스이름
        
        예시:
        arn:aws:s3:::my-bucket                          # S3 버킷 (리전 없음)
        arn:aws:ec2:ap-northeast-2:123456789012:instance/i-1234567890abcdef0
        arn:aws:iam::123456789012:user/student01        # IAM (리전 없음)
        arn:aws:lambda:ap-northeast-2:123456789012:function:my-function
        ```