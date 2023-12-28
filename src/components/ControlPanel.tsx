import { init } from "@/api";
import { Button, ButtonGroup } from "@chakra-ui/react";

const ControlPanel: React.FC = ({}) => {
  return (
    <ButtonGroup
      variant="outline"
      spacing="6"
      w="100%"
      position="absolute"
      bottom={"0"}
    >
      <Button onClick={() => init()}>init</Button>
    </ButtonGroup>
  );
};
export default ControlPanel;
