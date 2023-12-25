import { getStreams } from "@/lib/feed-service";
import { ResultCard } from "./result-card";

export const Results = async () => {
  const data = await getStreams();
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        Stream&apos;s we think you might like
      </h2>

      {data.length === 0 && (
        <div className="font-semibold text-muted-foreground">
          No streams found
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {data.map((result) => {
          return <ResultCard key={result.id} data={result} />;
        })}
      </div>
    </div>
  );
};

export const ResultsSkeleton = () => {
  return (
    <div>
      <h1>Results</h1>
    </div>
  );
};
