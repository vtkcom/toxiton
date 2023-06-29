import { useCallback, useMemo } from "react";
import { Scope, TranslateOptions } from "i18n-js";
import { i18n } from "../translation/i18n";

export function useTranslator() {
  const i18nMemo = useMemo(() => i18n, []);

  const t = useCallback((scope: Scope, options?: TranslateOptions) => {
    return i18nMemo.t(scope, options);
  }, []);

  return t;
}
