import { ISanta } from "@/types";
import { Box, Button, SimpleGrid } from "@chakra-ui/react";

interface Props {
  santas: ISanta[];
  selected?: string;
  disabled?: boolean;
  onClick?: (santa: ISanta) => void;
}

const SantaGrid: React.FC<Props> = ({
  santas,
  selected,
  disabled,
  onClick,
}) => {
  return (
    <SimpleGrid columns={3} spacing={10}>
      {santas.map((santa) => (
        <Box key={santa.id}>
          <Button
            bg={selected === santa.id ? "green.500" : "green.200"}
            width={"100%"}
            size="lg"
            disabled={disabled}
            onClick={() => onClick && onClick(santa)}
          >
            {santa.name}
          </Button>
        </Box>
      ))}
    </SimpleGrid>
  );
};
export default SantaGrid;
