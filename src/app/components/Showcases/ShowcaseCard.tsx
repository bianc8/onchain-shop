import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
  Link,
  useDisclosure,
} from "@nextui-org/react";
import { Product, Showcase } from "@/lib/mongodb";
import { ShowcaseModal } from "./ShowcaseModal";
import { Dispatch, SetStateAction } from "react";
import { CopyButton } from "../CopyButton";
import { appURL, createWarpcastIntent } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { IoIosShareAlt } from "react-icons/io";

interface ShowcaseCardProps {
  showcase: Omit<Showcase, "createdAt">;
  products: Product[];
  clickable?: boolean;
  customTitleClassNames?: string;
  setRefetchShowcases: Dispatch<SetStateAction<boolean>>;
  openInNewPage?: boolean;
}

export const ShowcaseCard: React.FC<ShowcaseCardProps> = ({
  showcase,
  products,
  clickable = true,
  customTitleClassNames = "",
  setRefetchShowcases,
  openInNewPage = false,
}) => {
  const { push } = useRouter();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const showcaseProducts = showcase.products
    .map((productId) => products.find((product) => product.id === productId))
    .filter((product) => product !== undefined) as Product[];

  const handleClick = () => {
    if (openInNewPage) {
      push(`/showcases/${showcase.id}`);
    } else {
      onOpen();
    }
  };

  return (
    <>
      <Card
        key={showcase.id}
        className={`p-4 gap-4 bg-zinc-950 outline-1 outline-zinc-700 ${clickable ? "hover:outline-2 hover:outline-primary-light hover:shadow-neon  hover:outline-offset-4" : ""} shadow-secondary-300`}
        style={{
          transition: "all 0.1s ease-in-out",
        }}
        isPressable={clickable}
        onPress={handleClick}
      >
        <CardHeader className="flex w-full justify-between p-0 items-start">
          <div className="flex flex-col items-start gap-1">
            <h4
              className={`font-bold text-large leading-none text-left ${customTitleClassNames}`}
            >
              {showcase.name}
            </h4>
            <small className="text-default-500 leading-none">
              {showcase.products.length} product(s)
            </small>
          </div>
          <div className="flex gap-2">
            <CopyButton
              textToCopy={`${appURL()}/frames/${showcase.shopId}/${showcase.id}`}
              className="h-auto p-1 rounded-small"
            >
              Copy URL
            </CopyButton>
            <Button
              size="sm"
              color={"primary"}
              as={Link}
              href={createWarpcastIntent(
                `${appURL()}/frames/${showcase.shopId}/${showcase.id}`,
              )}
              target="_blank"
              endContent={<IoIosShareAlt />}
              isIconOnly
            />
          </div>
        </CardHeader>
        <CardBody className="overflow-visible p-0">
          <div className="grid items-center gap-4 grid-cols-3">
            {showcaseProducts.map((product) => (
              <Image
                key={product.id}
                alt="Product image"
                className="object-cover rounded-xl aspect-square outline outline-1 outline-zinc-300 p-[2px]"
                src={product.image}
                width={100}
              />
            ))}
          </div>
        </CardBody>
      </Card>
      <ShowcaseModal
        showcase={showcase}
        products={showcaseProducts}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        setRefetchShowcases={setRefetchShowcases}
      />
    </>
  );
};
