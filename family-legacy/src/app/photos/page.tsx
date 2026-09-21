import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { PhotoPlate } from "@/components/PhotoPlate";
import { categoryLabels, photoPlates, type PhotoCategory } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Photos",
};

const order: PhotoCategory[] = ["person", "decade", "event"];

export default function PhotosPage() {
  return (
    <div className="pb-16">
      <PageHeader
        kicker="Gallery"
        title="Photographs of the house"
        dek="Every frame is a mat waiting for a print Brad actually holds. This vault does not borrow strangers from the internet."
      />
      <div className="mx-auto max-w-6xl px-6">
        {order.map((category) => {
          const plates = photoPlates.filter((plate) => plate.category === category);
          return (
            <section key={category} className="mb-14">
              <h2 className="kicker mb-6 text-[0.7rem] text-seal">
                {categoryLabels[category]}
              </h2>
              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {plates.map((plate) => (
                  <PhotoPlate key={plate.id} plate={plate} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
