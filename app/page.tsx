import { Room } from "@/components/Room";
import { profile } from "@/data/portfolio";

export default function Page() {
  return (
    <>
      <Room />
      <h1 className="sr">{profile.name}</h1>
      <p className="sr">
        {profile.headline} <a href="/lofi">Read the plain version.</a>
      </p>
    </>
  );
}
