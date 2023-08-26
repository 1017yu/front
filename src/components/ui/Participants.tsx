import { IParticipantsProps } from '@/types/IEvent';
import profileImg from '@/assets/dummy-profile.png';

export default function Participants(props: IParticipantsProps) {
  const { participants } = props;
  return (
    <div className="flex justify-center gap-4 px-4 sm:gap-8">
      {participants?.map((value, index) => (
        <div key={index}>
          <div className="overflow-hidden rounded-xl">
            <img
              src={
                value.profileImgUrl === 'DefaultImage'
                  ? profileImg
                  : value.profileImgUrl
              }
              alt="profile-image"
              width="100"
            />
            <div className="mt-1 flex justify-center sm:mt-4">
              {value.nickname}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
