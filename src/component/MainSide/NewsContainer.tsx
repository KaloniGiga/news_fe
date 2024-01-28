import { FunctionComponent } from "react";
import NewsCard from "./NewsCard";

interface INewsContainer {
  news: any[];
}
const NewsContainer: FunctionComponent<INewsContainer> = ({ news }) => {
  return (
    <div className="w-[70%] flex flex-col gap-x-4 gap-y-4 mt-8">
      {news && news.length > 0 ? (
        <>
          {news.map((item: any, index: number) => {
            return (
              <NewsCard
                key={index}
                id={item.id}
                title={item.title}
                coverImage={item.coverImage}
                description={item.description}
                tags={item.tags}
                links={item.links}
              />
            );
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
