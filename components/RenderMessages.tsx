import { Text } from "react-native";
import { useMessageContext } from "../contexts/MessageContext";
import React, { useEffect } from "react";
import { usePathname } from "expo-router";

export default function RenderMessages() {

  const {pathname} = useMessageContext();

  const onMessagesScreenActive = () => {
    console.log('User is on the All Messages screen');
  };

  useEffect(() => {
    console.log(pathname);
    // if (pathname === '/') {
    //   onMessagesScreenActive();
    // }
  }, [pathname]);

  const { allMessages } = useMessageContext();
  return (
    <Text>Rendering Messages: { allMessages.messages ? "true" : "false" }</Text>
  );
}
