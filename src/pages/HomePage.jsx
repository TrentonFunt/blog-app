import PostList from "@/components/shared/PostList";
import { posts } from "@/data/posts";
import { Box, Heading } from "@chakra-ui/react";

export default function HomePage() {
    return (
        <Box>
            <Heading as="h1" size="4xl">
                Now
            </Heading>
            <Box
                paddingTop={6}
                paddingBottom={12}
            >
            </Box>
            <PostList posts={posts}/>
        </Box>
    )
}