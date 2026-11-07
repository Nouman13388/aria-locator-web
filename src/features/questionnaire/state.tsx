import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import {
  initialAnswers,
  preferencesOnly,
  restorePreferences,
  type Answers,
} from "./schemas";
const storageKey = "aria-demo-preferences";
type State = { answers: Answers; complete: boolean };
type Action =
  | { type: "update"; patch: Partial<Answers> }
  | { type: "complete" }
  | { type: "reset" };
export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "update":
      return { ...state, answers: { ...state.answers, ...action.patch } };
    case "complete":
      return { answers: { ...initialAnswers }, complete: true };
    case "reset":
      return { answers: { ...initialAnswers }, complete: false };
  }
}
const QuestionnaireContext = createContext<{
  state: State;
  ready: boolean;
  dispatch: React.Dispatch<Action>;
} | null>(null);
export function QuestionnaireProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    answers: { ...initialAnswers },
    complete: false,
  });
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(storageKey);
      if (raw)
        dispatch({
          type: "update",
          patch: restorePreferences(JSON.parse(raw)),
        });
    } catch {
      /* Ignore unavailable or malformed storage. */
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try {
      if (state.complete) sessionStorage.removeItem(storageKey);
      else
        sessionStorage.setItem(
          storageKey,
          JSON.stringify(preferencesOnly(state.answers)),
        );
    } catch {
      /* The questionnaire also works without storage. */
    }
  }, [state.answers, state.complete, ready]);
  return (
    <QuestionnaireContext.Provider value={{ state, dispatch, ready }}>
      {children}
    </QuestionnaireContext.Provider>
  );
}
export function useQuestionnaire() {
  const value = useContext(QuestionnaireContext);
  if (!value) throw new Error("QuestionnaireProvider is required");
  return value;
}
