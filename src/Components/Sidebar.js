import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  HStack,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react";
import { Autocomplete } from "@react-google-maps/api";
import React, { useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { Reorder } from "framer-motion";

const Sidebar = (props) => {
  const { waypoints, setWaypoints } = props;

  const waypoint = useRef(null);

  const addWaypoint = () => {
    // eslint-disable-next-line no-undef
    const geocoder = new google.maps.Geocoder();
    const address = waypoint.current.value;
    geocoder.geocode({ address: address }, function (results, status) {
      // eslint-disable-next-line no-undef
      if (status === google.maps.GeocoderStatus.OK) {
        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();
        setWaypoints((prevState) => [
          ...prevState,
          {
            id: Math.floor(Math.random() * 100),
            address: address,
            location: {
              lat: lat,
              lng: lng,
            },
          },
        ]);
      }
    });
    waypoint.current.value = "";
  };
  const deleteWaypoint = (id) => {
    setWaypoints(waypoints.filter((wayPoint) => wayPoint.id !== id));
  };
  const onKeyDownHandle = (e) => {
    if (e.keyCode === 13) {
      addWaypoint();
    }
  };
  return (
    <>
      <Heading
        mb={{ base: "5", md: "6", lg: "8" }}
        fontSize={{ base: "22px", md: "30px", lg: "40px" }}
      >
        Список маршрутів
      </Heading>
      <HStack spacing={2} justifyContent={{base: "center", lg: "space-between"}} flexDirection={{ base: "column", lg: "row"}}>
        <Box flexGrow={1}  width="100%" mb={{base: "15px", lg: "0"}}>
          <Autocomplete>
            <Input
              type="text"
              placeholder="Додай точку маршруту"
              ref={waypoint}
              onKeyDown={onKeyDownHandle}
            />
          </Autocomplete>
        </Box>
        <ButtonGroup width={{base: "100%", md: "auto"}} ms={{base: '0!important', lg: "10px!important"}}>
          <Button  width={{base: "100%", md: "auto"}} colorScheme="green" type="submit" onClick={addWaypoint}>
            Додати маршрут
          </Button>
        </ButtonGroup>
      </HStack>
      <Reorder.Group values={waypoints} onReorder={setWaypoints}>
        {waypoints.map((waypoint, index) => (
          <Reorder.Item key={waypoint.id} value={waypoint} style={{listStyleType: "none", marginTop:"15px", paddingLeft: '5px'}}>
            <HStack w={"100%"} justifyContent={"space-between"}>
              <Text>
                {index + 1}) {waypoint.address}
              </Text>
              <IconButton
                aria-label="center back"
                icon={<FaTimes />}
                onClick={() => deleteWaypoint(waypoint.id)}
              />
            </HStack>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </>
  );
};

export default React.memo(Sidebar);
