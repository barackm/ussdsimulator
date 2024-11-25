"use client";
import { useRef, useState } from "react";
import ActionButtons from "~/components/ussd-simulator/action-buttons";
import Keypad from "~/components/ussd-simulator/keypad";
import LoadingScreen from "~/components/ussd-simulator/loading-screen";
import ResponseMessage from "~/components/ussd-simulator/response-message";
import StatusBar from "~/components/ussd-simulator/status-bar";
import UssdInput from "~/components/ussd-simulator/ussd-input";
import { validateUssdCode } from "~/utils/ussd";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import UssdConfigModal from "~/components/ussd-simulator/config";
import { Button } from "~/components/ui/button";
import { FaCog } from "react-icons/fa";

const Ussd = () => {
  const [ussdCode, setUssdCode] = useState("*456#");
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [initialDial, setInitialDial] = useState(true);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [showConfigModal, setShowConfigModal] = useState(false);

  const ussdInputRef = useRef<HTMLInputElement>(null);

  const appendToUssdCode = (value: string) => {
    setUssdCode((prev) => prev + value);
    keepFocus();
  };

  const keepFocus = () => {
    ussdInputRef.current?.focus();
  };

  const initializeSession = () => {
    if (!sessionId) {
      const newSessionId = uuidv4();
      setSessionId(newSessionId);
    }
  };

  const resetSession = () => {
    setSessionId(null);
    setInitialDial(true);
    setUssdCode("*456#");
    setResponseMessage("");
  };

  const sendUssd = async () => {
    initializeSession();
    if (ussdCode.trim() === "") {
      setResponseMessage("Please enter a USSD code.");
      return;
    }

    const service = validateUssdCode(ussdCode);
    if (!service && initialDial) {
      setResponseMessage("END UNKNOWN APPLICATION");
      setUssdCode("");
      resetSession();
      return;
    }

    try {
      setLoading(true);
      const payload = {
        text: initialDial ? "" : ussdCode,
        sessionId: sessionId,
        serviceCode: service!.serviceCode,
        phoneNumber: "0780083122",
        networkCode: service!.networkCode,
      };

      const response = await axios.post("http://localhost:8000/ussd", payload);
      const serverResponse = response.data;
      setResponseMessage(serverResponse);
      setUssdCode("");
      if (initialDial) {
        setInitialDial(false);
      }
    } catch {
      setResponseMessage("END An error occurred. Please try again later.");
      setUssdCode("");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    setUssdCode((prev) => prev.slice(0, -1));
  };

  const clearMessage = () => {
    setResponseMessage("");
    setUssdCode("");
    keepFocus();
  };

  return (
    <div className='screen relative overflow-hidden flex justify-center items-center h-screen'>
      <div className='absolute top-5 right-5 p-4'>
        <Button variant='outline' className='rounded-full w-9' onClick={() => setShowConfigModal(true)}>
          <FaCog />
        </Button>
        <UssdConfigModal open={showConfigModal} onClose={() => setShowConfigModal(false)} />
      </div>
      <div className='relative flex justify-center items-center h-[700px] w-[350px] overflow-hidden '>
        <img
          src='phone-frame.png'
          alt='Phone Frame'
          className='absolute w-full h-full z-10 pointer-events-none top-0 bottom-0'
        />
        <div className='absolute top-0 w-full bottom-0 bg-white rounded-[60px] z-0 overflow-hidden'>
          <div className='relative overflow-hidden flex h-full pb-10 flex-col'>
            <StatusBar />
            <div className='h-full relative pt-10 flex flex-col'>
              <div className='flex flex-col flex-grow justify-end'>
                <UssdInput ussdCode={ussdCode} setUssdCode={setUssdCode} />
                <Keypad appendToUssdCode={appendToUssdCode} />
                <ActionButtons ussdCode={ussdCode} sendUssd={sendUssd} handleDelete={handleDelete} />
              </div>
            </div>
          </div>
          {loading && <LoadingScreen />}
          {responseMessage && (
            <ResponseMessage
              responseMessage={responseMessage}
              clearMessage={clearMessage}
              sendUssd={sendUssd}
              setUssdCode={setUssdCode}
              ussdCode={ussdCode}
              setResponseMessage={setResponseMessage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Ussd;
