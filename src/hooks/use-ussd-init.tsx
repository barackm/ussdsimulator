import { useEffect } from "react";
import { useUssdConfigStore } from "~/stores/ussd-config-store";

export const useInitializeUssdConfig = () => {
  const setConfig = useUssdConfigStore((state) => state.setConfig);
  const setShowConfigModal = useUssdConfigStore(
    (state) => state.setShowConfigModal
  );

  useEffect(() => {
    const savedConfig = localStorage.getItem("ussdConfig");
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    } else {
      setShowConfigModal(true);
    }
  }, [setConfig, setShowConfigModal]);
};
