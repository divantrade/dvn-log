const { createClient } = require("@sanity/client");

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: "2024-07-01",
  useCdn: false,
});

async function testFetch() {
  try {
    console.log("Testing Sanity connection...");
    console.log("Project ID:", process.env.SANITY_PROJECT_ID);
    console.log("Dataset:", process.env.SANITY_DATASET);
    
    const posts = await client.fetch(`*[_type == "blogPost"][0...3]{title, "slug": slug.current, _updatedAt}`);
    console.log("SUCCESS! Posts found:", posts.length);
    console.log("Latest posts:", JSON.stringify(posts, null, 2));
  } catch (error) {
    console.error("ERROR:", error.message);
  }
}

testFetch();
