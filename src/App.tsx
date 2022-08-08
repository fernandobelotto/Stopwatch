import { Box, Button, Center, Group, Stack, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";

export default function App() {
  const [running, setRunning] = useState(false);

  const [laps, setLaps] = useState<any>([]);

  const [values, setValues] = useState(0);

  function handleStart() {
    setRunning(!running);
  }

  function handleStopLab() {
    if (running) {
      setLaps([...laps, { index: laps.length + 1, timestamp: values }]);
    } else {
      setValues(0);
      setLaps([]);
    }
  }

  useEffect(() => {
    if (running) {
      const ref = setInterval(() => {
        setValues(values + 10);
      }, 10);
      return () => clearInterval(ref);
    }
  }, [values, running]);

  return (
    <>
      <Center style={{ marginTop: "10rem", width: "100vw" }}>
        <Box
          style={{
            border: "1px solid gray",
            borderRadius: "4px",
            padding: "16px",
          }}
        >
          <Stack>
            <Title order={1}>Stopwatch</Title>
            <Title align="center" order={2}>
              {(values / 60000).toFixed().toString()}:
              {(values / 1000).toFixed().toString()}:
              {/* TODO: check how to show the miliseconds */}
              {/* {values.toString()} */}
            </Title>
            <Button onClick={handleStart}>{running ? "Stop" : "Start"}</Button>
            <Button onClick={handleStopLab}>{running ? "Lap" : "Reset"}</Button>
          </Stack>
        </Box>
      </Center>
      <Center style={{ marginTop: "16px" }}>
        <Stack spacing="xs">
          {laps.map((lap: any) => (
            <>
              <Group
                style={{
                  border: "1px solid gray",
                  borderRadius: "4px",
                  padding: "16px",
                }}
              >
                <Text>Lap {lap.index}</Text>
                <Text>Time: {lap.timestamp}</Text>
              </Group>
            </>
          ))}
        </Stack>
      </Center>
    </>
  );
}
