// 이메일 유효성 정규식
export const EMAIL_REGEX =
  /^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

// 비밀번호 8자리 이상 숫자 최소 1개, 문자 최소 1개
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

// 닉네임 정규식(영어, 숫자, 특수기호( . , _ , - 만 허용) 2~16글자)
export const NICKNAME_REGEX = /^[a-z0-9._-]{2,16}$/;
