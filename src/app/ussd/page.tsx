"use client";
import { useEffect, useRef, useState } from "react";
import ActionButtons from "~/components/ussd-simulator/action-buttons";
import Keypad from "~/components/ussd-simulator/keypad";
import LoadingScreen from "~/components/ussd-simulator/loading-screen";
import ResponseMessage from "~/components/ussd-simulator/response-message";
import StatusBar from "~/components/ussd-simulator/status-bar";
import UssdInput from "~/components/ussd-simulator/ussd-input";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import UssdConfigModal from "~/components/ussd-simulator/config";
import { Button } from "~/components/ui/button";
import { FaCog } from "react-icons/fa";
import { useInitializeUssdConfig } from "~/hooks/use-ussd-init";
import { useUssdConfigStore } from "~/stores/ussd-config-store";
import Image from "next/image";
import Link from "next/link";
import { Home } from "lucide-react";

const Ussd = () => {
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);

  const showConfigModal = useUssdConfigStore((state) => state.showConfigModal);
  const setShowConfigModal = useUssdConfigStore(
    (state) => state.setShowConfigModal
  );
  const config = useUssdConfigStore((state) => state);
  const [inputValue, setInputValue] = useState("");
  const initializedRef = useRef(false);

  useInitializeUssdConfig();

  useEffect(() => {
    if (!initializedRef.current && config.serviceCode) {
      setInputValue(config.serviceCode);
      initializedRef.current = true;
    }
  }, [config, inputValue]);

  const ussdInputRef = useRef<HTMLInputElement>(null);

  const appendToUssdCode = (value: string) => {
    setInputValue((prev) => prev + value);
    keepFocus();
  };

  const keepFocus = () => {
    ussdInputRef.current?.focus();
  };

  const initializeSession = () => {
    if (!sessionId) {
      const newSessionId = uuidv4();
      setSessionId(newSessionId);
      return newSessionId;
    }
  };

  const resetSession = () => {
    setSessionId(null);
    setInputValue("");
    setResponseMessage("");
  };

  const sendUssd = async () => {
    const newSessionId = initializeSession();

    if (inputValue.trim() === "") {
      setResponseMessage("Please enter a USSD code.");
      return;
    }

    let extractedText = "";

    if (!sessionId) {
      // Initial USSD code
      if (inputValue.startsWith("*") && inputValue.endsWith("#")) {
        const ussdCodeBody = inputValue.slice(1, -1);
        const serviceCodeBody = config.serviceCode.slice(1, -1);

        if (ussdCodeBody.startsWith(serviceCodeBody)) {
          extractedText = ussdCodeBody.slice(serviceCodeBody.length);
          if (extractedText.startsWith("*")) {
            extractedText = extractedText.slice(1);
          }
        } else {
          setResponseMessage("END INVALID USSD CODE");
          resetSession();
          return;
        }
      } else {
        setResponseMessage("END INVALID USSD CODE");
        resetSession();
        return;
      }
    } else {
      // Subsequent reply in the session
      extractedText = inputValue.trim();
    }

    try {
      setLoading(true);

      const payload = {
        text: extractedText,
        sessionId: sessionId || newSessionId,
        serviceCode: config.serviceCode,
        phoneNumber: config.phoneNumber.trim(),
      };

      const response = await axios.post(config.callbackUrl, payload);
      const serverResponse = response.data;

      // Check if session has ended
      if (serverResponse.startsWith("END")) {
        resetSession();
      }

      setEditMode(false);
      setResponseMessage(serverResponse);
      setInputValue("");
    } catch {
      setResponseMessage("END An error occurred. Please try again later.");
      setInputValue("");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    setInputValue((prev) => prev.slice(0, -1));
  };

  const clearMessage = () => {
    setResponseMessage("");
    setInputValue("");
    keepFocus();
  };

  return (
    <div className="screen relative overflow-hidden flex justify-center items-center h-screen">
      <div className="absolute top-5 right-5 p-4">
        <Button
          variant="outline"
          className="rounded-full w-9"
          onClick={() => setShowConfigModal(true)}
        >
          <FaCog />
        </Button>
        <UssdConfigModal
          open={showConfigModal}
          onClose={() => setShowConfigModal(false)}
        />
      </div>
      <div className="absolute top-5 left-5 p-4">
        <Link href="/" className="rounded-full w-9">
          <Home className="w-6 h-6 text-gray-800" />
        </Link>
      </div>
      <div className="relative flex justify-center items-center h-screen sm:h-[700px] w-[350px] overflow-hidden">
        <Image
          src="/phone-frame.png"
          alt="Phone Frame"
          className="absolute w-full h-full z-10 pointer-events-none top-0 bottom-0"
          layout="fill"
          objectFit="contain"
        />
        <div className="absolute top-0 w-full bottom-0 bg-white rounded-[60px] z-0 overflow-hidden">
          <div className="relative overflow-hidden flex h-full pb-10 flex-col">
            <StatusBar />
            <div className="h-full relative pt-10 flex flex-col">
              <div className="flex flex-col flex-grow justify-end">
                <UssdInput
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                />
                <Keypad appendToUssdCode={appendToUssdCode} />
                <ActionButtons
                  inputValue={inputValue}
                  sendUssd={sendUssd}
                  handleDelete={handleDelete}
                />
              </div>
            </div>
          </div>
          {loading && <LoadingScreen />}
          {responseMessage && (
            <ResponseMessage
              responseMessage={responseMessage}
              clearMessage={clearMessage}
              sendUssd={sendUssd}
              setInputValue={setInputValue}
              inputValue={inputValue}
              setResponseMessage={setResponseMessage}
              editMode={editMode}
              setEditMode={setEditMode}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Ussd;
