import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="container mx-auto px-4 mt-10">
      <AspectRatio>{/* <Image /> */}</AspectRatio>
      <Button variant={"outline"}>
        <span>Hello</span>
      </Button>
    </div>
  );
};

export default Home;
