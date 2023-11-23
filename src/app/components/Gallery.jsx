import CloudinaryImage from './CloudinaryImage'
import CloudinaryVideo from './CloudinaryVideo'
import UploadButton from './UploadButton'
import cloudinary from 'cloudinary'

export default async function Gallery() {
  const resultImage = await cloudinary.v2.search
    .expression('resource_type:image')
    .sort_by('created_at', 'desc')
    .with_field('tags')
    .max_results(6)
    .execute()
  const resultVideo = await cloudinary.v2.search
    .expression('resource_type:video')
    .sort_by('created_at', 'desc')
    .with_field('tags')
    .max_results(3)
    .execute()

  return (
    <section className="w-full mt-4 flex flex-col gap-6">
      <div className="flex justify-between w-full">
        <h1>Gallery</h1>
        <UploadButton />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {resultImage.resources.map((res) => (
          <CloudinaryImage key={res.public_id} publicId={res.public_id} />
        ))}
      </div>
      <div className="flex flex-col w-full">
        {resultVideo.resources.map((res) => (
          <CloudinaryVideo key={res.public_id} publicId={res.public_id} />
        ))}
      </div>
    </section>
  )
}
