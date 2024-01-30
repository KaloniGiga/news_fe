import { FunctionComponent } from "react";
import NewsCard from "./NewsCard";
import { GetPostData } from "@/redux/post/type";

interface INewsContainer {
  news: GetPostData[];
}
const NewsContainer: FunctionComponent<INewsContainer> = ({ news }) => {
  return (
    <div className="w-[70%] flex flex-col gap-x-4 gap-y-4 mt-8">
      {news && news.length > 0 ? (
        <>
          {news.map((item, index: number) => {
            return <NewsCard key={index} editData={item} />;
          })}
        </>
      ) : (
        <div className="w-full h-full flex justify-center items-center py-4 px-4">
          <h3 className="text-center text-[22px]">No news found.</h3>
        </div>
      )}
    </div>
  );
};

export default NewsContainer;
