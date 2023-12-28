import useApp from "@/AppContext";
import { ANIMATION_SPEED, APP_STEP } from "@/constants";
import { ISanta } from "@/types";
import { Box, Center, Heading, Stack } from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import SantaGrid from "../components/SantaGrid";
import { delay, getStepsNum } from "@/utils";

export default function Index() {
  const [step, setStep] = useState(APP_STEP.PICK_SELF);
  const [stepCounter, setStepCounter] = useState<number>(0);
  const [selected, setSelected] = useState<string>();
  const [selectedOrphan, setSelectedOrphan] = useState<ISanta>();

  const {
    freeSantas,
    orphans,
    assignOrphan,
    setSantaUser,
    santaUser,
    notUserSantas,
  } = useApp();

  const totalSteps = useMemo(() => getStepsNum(), []);

  useEffect(() => {
    if (!santaUser || step !== APP_STEP.SELECTING) {
      return;
    }

    const process = async () => {
      await delay(ANIMATION_SPEED);

      if (!santaUser || !selected) {
        return;
      }

      stepCounter >= totalSteps && orphans.find(({ id }) => selected === id)
        ? onOrphanPicked(santaUser.id, selected)
        : pickOrphan();
    };

    process();
  }, [stepCounter, santaUser, selected, orphans]);

  const pickOrphan = useCallback(async () => {
    step !== APP_STEP.SELECTING && setStep(APP_STEP.SELECTING);

    const orphanId = notUserSantas[stepCounter % notUserSantas.length].id;
    setSelected(orphanId);
    setStepCounter(stepCounter + 1);
  }, [stepCounter, orphans]);

  const onOrphanPicked = async (santaId: string, orhpanId: string) => {
    const selectedOrphan = orphans.find((orphan) => orphan.id === orhpanId);
    setStep(APP_STEP.SELECTED);
    await assignOrphan(santaId, orhpanId);
    setSelectedOrphan(selectedOrphan);
  };

  return (
    <Center>
      <Box
        w={["100%", "100%", "100%", "768px"]}
        h={["100vh", "100vh", "100vh", "500px"]}
        bg="red.300"
        my={["0", "0", "0", "3rem"]}
        p="1em"
      >
        {step === APP_STEP.PICK_SELF && (
          <>
            <Center mb="1.5em">
              <Heading color="green.400">Who Are You?</Heading>
            </Center>
            <SantaGrid
              santas={freeSantas}
              onClick={(santa) => {
                setSantaUser(santa);
                pickOrphan();
              }}
            />
          </>
        )}

        {step === APP_STEP.SELECTING && (
          <>
            <Center mb="1.5em">
              <Heading color="green.400">
                {santaUser?.name} YOUR ORPHAN IS BEING SELECTED...
              </Heading>
            </Center>
            <SantaGrid santas={notUserSantas} selected={selected} disabled />
          </>
        )}

        {step === APP_STEP.SELECTED && (
          <Center mb="1.5em">
            <Stack align="center" gap="1em">
              <Heading size="4xl" color="black">
                {santaUser?.name.toUpperCase()}
              </Heading>
              <Heading color="green.400" size="2xl">
                YOUR ORPHAN IS
              </Heading>
              <Heading size="4xl" color="black">
                {selectedOrphan?.name}
              </Heading>
            </Stack>
          </Center>
        )}
      </Box>
    </Center>
  );
}
