import Container from '@/components/ui/Container';
import { useUser } from '@/hooks/useUser';
export default function Home() {
  const { user } = useUser();
  return (
    <Container>
      <div>이메일 : {user?.email}</div>
      <div>닉네임 : {user?.nickname}</div>
      <div>프로필이미지url : {user?.profileImgUrl}</div>
      {/* {user?.accessToken} */}
    </Container>
  );
}
