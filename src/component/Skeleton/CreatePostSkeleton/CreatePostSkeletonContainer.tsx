import CreatePostSkeleton from "./CreatePostSkeleton";

const CreatePostSkeletonContainer = () => {
  return (
    <div className="w-full flex flex-col gap-4 pl-20 pb-10">
      <CreatePostSkeleton />
      <CreatePostSkeleton />
      <CreatePostSkeleton />
    </div>
  );
};

export default CreatePostSkeletonContainer;
