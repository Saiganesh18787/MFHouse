import Container from "@/components/layout/Container";

export default function Loading() {
  return (
    <Container>
      <div className="py-10">
        <div className="animate-pulse">

          <div className="mb-3 h-4 w-40 rounded bg-gray-200" />

          <div className="h-10 w-96 max-w-full rounded bg-gray-200" />

          <div className="mt-3 h-5 w-48 rounded bg-gray-200" />

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-28 rounded-xl bg-gray-200"
              />
            ))}
          </div>

        </div>
      </div>
    </Container>
  );
}