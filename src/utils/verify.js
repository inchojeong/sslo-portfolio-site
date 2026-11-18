// "게시 전 확인 필요" 표시는 개발 모드(또는 VITE_SHOW_VERIFY=true)에서만 노출합니다.
export const showVerify = import.meta.env.DEV || import.meta.env.VITE_SHOW_VERIFY === 'true';
