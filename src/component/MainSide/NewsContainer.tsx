import { FunctionComponent } from "react";
import NewsCard from "./NewsCard";

interface INewsContainer {
  news: any[];
}
const NewsContainer: FunctionComponent<INewsContainer> = ({ news }) => {
  return (
    <div className="w-full flex flex-wrap gap-x-4 gap-y-4 mt-8">
      {news && news.length > 0 ? (
        <>
          {news.map((item: any, index: number) => {
            return <NewsCard key={index} title={item.title} image={item.image} />;
          })}
        </>
      ) : (
        <div className="w-full py-4 px-4">
          <h3 className="w-full mx-auto text-[22px]">No news found.</h3>
        </div>
      )}
    </div>
  );
};

export default NewsContainer;
