import useApp from "@/AppContext";
import { init } from "@/api";
import { Box, Button, ButtonGroup } from "@chakra-ui/react";

const ControlPanel: React.FC = ({}) => {
  const { santas } = useApp();

  return (
    <>
      <ButtonGroup
        variant="outline"
        spacing="6"
        w="100%"
        position="absolute"
        bottom={"0"}
      >
        <Button onClick={() => init()}>init</Button>
      </ButtonGroup>
      <div>
        {santas.map((santa) => (
          <Box mb="1em">
            <span>{santa.name}</span> -{" "}
            <span>{santas.find((s) => s.id === santa.childId)?.name}</span>
          </Box>
        ))}
      </div>
    </>
  );
};
export default ControlPanel;
