#!/usr/bin/env python3
"""
PPTX 발표자 메모 수정 스크립트

기존 PPTX 파일의 발표자 메모만 수정합니다.
전체 프레젠테이션을 다시 생성하지 않고 메모만 업데이트합니다.

사용법:
  python update-notes.py <pptx_file> <notes_json>

예시:
  python update-notes.py presentation.pptx notes.json

notes.json 형식:
{
  "notes": [
    {"slide": 1, "text": "첫 번째 슬라이드 발표자 메모"},
    {"slide": 2, "text": "두 번째 슬라이드 발표자 메모"},
    ...
  ]
}

또는 모든 슬라이드에 순서대로 적용:
{
  "notes": [
    "첫 번째 슬라이드 메모",
    "두 번째 슬라이드 메모",
    ...
  ]
}
"""

import sys
import json
import os
from pptx import Presentation
from pptx.util import Inches, Pt


def update_notes(pptx_path: str, notes_data: dict, output_path: str = None):
    """PPTX 파일의 발표자 메모를 업데이트합니다."""

    # 출력 경로가 없으면 원본 파일 덮어쓰기
    if output_path is None:
        output_path = pptx_path

    # PPTX 파일 열기
    prs = Presentation(pptx_path)

    notes = notes_data.get('notes', [])

    # notes가 리스트인 경우 처리
    for i, note_item in enumerate(notes):
        # 딕셔너리 형태: {"slide": 1, "text": "..."}
        if isinstance(note_item, dict):
            slide_num = note_item.get('slide', i + 1)
            note_text = note_item.get('text', '')
        # 문자열 형태: 순서대로 적용
        else:
            slide_num = i + 1
            note_text = str(note_item)

        # 슬라이드 인덱스 (0부터 시작)
        slide_idx = slide_num - 1

        if 0 <= slide_idx < len(prs.slides):
            slide = prs.slides[slide_idx]

            # 노트 슬라이드가 없으면 생성
            if not slide.has_notes_slide:
                notes_slide = slide.notes_slide
            else:
                notes_slide = slide.notes_slide

            # 노트 텍스트 프레임 가져오기
            text_frame = notes_slide.notes_text_frame

            # 기존 텍스트 지우고 새 텍스트 설정
            text_frame.clear()
            p = text_frame.paragraphs[0]
            p.text = note_text

            print(f"✓ 슬라이드 {slide_num} 메모 업데이트 완료")
        else:
            print(f"⚠ 슬라이드 {slide_num}이 존재하지 않습니다 (총 {len(prs.slides)}개 슬라이드)")

    # 저장
    prs.save(output_path)
    print(f"\n저장 완료: {output_path}")
    return output_path


def extract_notes(pptx_path: str, output_json: str = None):
    """기존 PPTX 파일에서 발표자 메모를 추출합니다."""

    prs = Presentation(pptx_path)
    notes = []

    for i, slide in enumerate(prs.slides, 1):
        note_text = ""
        if slide.has_notes_slide:
            notes_slide = slide.notes_slide
            text_frame = notes_slide.notes_text_frame
            note_text = text_frame.text

        notes.append({
            "slide": i,
            "text": note_text
        })
        print(f"슬라이드 {i}: {len(note_text)} 글자")

    result = {"notes": notes}

    if output_json:
        with open(output_json, 'w', encoding='utf-8') as f:
            json.dump(result, f, ensure_ascii=False, indent=2)
        print(f"\n추출 완료: {output_json}")

    return result


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    command = sys.argv[1]

    # 메모 추출 명령
    if command == 'extract':
        if len(sys.argv) < 3:
            print("사용법: python update-notes.py extract <pptx_file> [output.json]")
            sys.exit(1)

        pptx_path = sys.argv[2]
        output_json = sys.argv[3] if len(sys.argv) > 3 else None

        result = extract_notes(pptx_path, output_json)

        if not output_json:
            print("\n--- 추출된 메모 ---")
            print(json.dumps(result, ensure_ascii=False, indent=2))

    # 메모 업데이트 (기본)
    elif command.endswith('.pptx'):
        pptx_path = command

        if len(sys.argv) < 3:
            print("사용법: python update-notes.py <pptx_file> <notes.json> [output.pptx]")
            sys.exit(1)

        notes_json = sys.argv[2]
        output_path = sys.argv[3] if len(sys.argv) > 3 else None

        with open(notes_json, 'r', encoding='utf-8') as f:
            notes_data = json.load(f)

        update_notes(pptx_path, notes_data, output_path)

    else:
        print(f"알 수 없는 명령: {command}")
        print(__doc__)
        sys.exit(1)


if __name__ == '__main__':
    main()
