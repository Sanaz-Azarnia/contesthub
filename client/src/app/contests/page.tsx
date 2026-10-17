import { fetchQuestions, fetchCategories, fetchDifficulties } from "@/lib/contest-fetch"
import ContestsClient from "@/components/contests/contests-client"
 

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ContestsPage({ searchParams }: Props) {
  const params = await searchParams
  const initialCategory = typeof params.category === "string" ? params.category : ""

  const [categories, difficulties, data] = await Promise.all([
    fetchCategories(),
    fetchDifficulties(),
    fetchQuestions({
      page: "1",
      pageSize: "12",
      ...(initialCategory && { category: initialCategory }),
    }),
  ])

   
  return (
    <ContestsClient
      initialQuestions={data.items || []}
      initialTotalPages={data.totalPages || 1}
      categories={categories}
      difficulties={difficulties}
      initialCategory={initialCategory}
    />
  )
}