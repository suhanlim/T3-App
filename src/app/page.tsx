import Link from "next/link";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

const mockUrls = [
  "https://utfs.io/f/6ded9778-64b5-43df-a65e-ba42330230ac-e7vdj8.jpeg",
  "https://utfs.io/f/4183654e-6f3f-4ac1-9b9f-d6b0e98cadb8-zmtp.jpeg",
  "https://utfs.io/f/5a39797f-2f00-4dda-b733-7d751db1892a-wirbut.jpeg",
  "https://utfs.io/f/62e678cb-b8ce-405a-b586-3bf8662e95b3-kvnxix.jpeg",
]

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default async function HomePage() {

  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  console.log(images);

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {[...images, ...images, ...images].map((image, index) => (
          <div key={image.id + "-" + index} className="flex flex-col w-48">
            <img src={image.url} />
            <div>{image.name}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
