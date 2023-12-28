import useApp from "@/AppContext";
import { ANIMATION_SPEED, APP_STEP } from "@/constants";
import { ISanta } from "@/types";
import { Box, Center, Heading } from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import SantaGrid from "../components/SantaGrid";
import { delay, getStepsNum } from "@/utils";

export default function Index() {
  const [step, setStep] = useState(APP_STEP.PICK_SELF);
  const [stepCounter, setStepCounter] = useState<number>(0);
  const [selected, setSelected] = useState<string>();
  const [selectedOrphan, setSelectedOrphan] = useState<ISanta>();

  const { freeSantas, orphans, assignOrphan, setSantaUser, santaUser } =
    useApp();

  const totalSteps = useMemo(() => getStepsNum(), []);

  useEffect(() => {
    if (!santaUser) {
      return;
    }

    const process = async () => {
      await delay(ANIMATION_SPEED);

      if (!santaUser || !selected) {
        return;
      }

      stepCounter >= totalSteps
        ? onOrphanPicked(santaUser.id, selected)
        : pickOrphan();
    };

    process();
  }, [stepCounter, santaUser]);

  const pickOrphan = useCallback(async () => {
    step !== APP_STEP.SELECTING && setStep(APP_STEP.SELECTING);

    const orphanId = orphans[stepCounter % orphans.length].id;
    setSelected(orphanId);
    setStepCounter(stepCounter + 1);
  }, [stepCounter, orphans]);

  const onOrphanPicked = async (santaId: string, orhpanId: string) => {
    const selectedOrphan = orphans.find((orphan) => orphan.id === orhpanId);
    await assignOrphan(santaId, orhpanId);
    setStep(APP_STEP.SELECTED);
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
            <SantaGrid santas={orphans} selected={selected} disabled />
          </>
        )}

        {step === APP_STEP.SELECTED && (
          <Center mb="1.5em">
            <Heading color="green.400">
              {santaUser?.name}, YOUR ORPHAN IS {selectedOrphan?.name}...
            </Heading>
          </Center>
        )}
      </Box>
    </Center>
  );
}
