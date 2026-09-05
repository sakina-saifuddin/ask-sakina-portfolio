import fs from "node:fs";
import path from "node:path";

const WORKING_PHOTO_PATH = "/images/sakina-working.jpg";

export function WorkingPhoto() {
  const exists = fs.existsSync(path.join(process.cwd(), "public", WORKING_PHOTO_PATH));

  if (!exists) {
    return (
      <div className="working-photo-placeholder">
        <span>Add photo</span>
        <p>/public/images/sakina-working.jpg</p>
        <small>A candid, professional shot of Sakina working — coding, at a laptop, or in a natural workspace.</small>
      </div>
    );
  }

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={WORKING_PHOTO_PATH} alt="Sakina Saifuddin working" loading="lazy" />;
}
