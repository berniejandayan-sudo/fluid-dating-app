import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type IntroStage = 'splash' | 'loading' | 'ready';

export const ALL_AVAILABLE_TAGS: string[] = [
  'Relationship',
  'Monogamy',
  'Trans-Friendly Spaces',
  'Casual',
  'Polyamorous',
  'Friendship',
];

export const DEFAULT_SELECTED_TAGS: string[] = [
  'Relationship',
  'Monogamy',
  'Trans-Friendly Spaces',
];

export interface FilterState {
  exploreHorizon: boolean;
  verifiedOnly: boolean;
  selectedTags: string[];
  allAvailableTags: string[];
  introStage: IntroStage;
  isAuthenticated: boolean;
  userEmail: string | null;
}

export interface FilterContextType extends FilterState {
  applyFilterState: (newHorizon: boolean, newVerified: boolean, newTags: string[]) => void;
  resetFilterState: () => void;
  setIntroStage: (stage: IntroStage) => void;
  replayIntro: () => void;
  loginUser: (email?: string) => void;
  logoutUser: () => void;
  setExploreHorizon: React.Dispatch<React.SetStateAction<boolean>>;
  setVerifiedOnly: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
}

export const FilterContext = createContext<FilterContextType | undefined>(undefined);

export interface FilterProviderProps {
  children: ReactNode;
  initialValues?: Partial<FilterState>;
}

export function FilterProvider({ children, initialValues }: FilterProviderProps) {
  const [exploreHorizon, setExploreHorizon] = useState<boolean>(
    initialValues?.exploreHorizon ?? true
  );
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(
    initialValues?.verifiedOnly ?? true
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    initialValues?.selectedTags ?? [...DEFAULT_SELECTED_TAGS]
  );
  const [introStage, setIntroStageState] = useState<IntroStage>(
    initialValues?.introStage ?? 'splash'
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    initialValues?.isAuthenticated ?? false
  );
  const [userEmail, setUserEmail] = useState<string | null>(
    initialValues?.userEmail ?? null
  );

  const applyFilterState = useCallback(
    (newHorizon: boolean, newVerified: boolean, newTags: string[]) => {
      setExploreHorizon(newHorizon);
      setVerifiedOnly(newVerified);
      setSelectedTags(newTags);
    },
    []
  );

  const resetFilterState = useCallback(() => {
    setExploreHorizon(true);
    setVerifiedOnly(true);
    setSelectedTags([...DEFAULT_SELECTED_TAGS]);
  }, []);

  const setIntroStage = useCallback((stage: IntroStage) => {
    setIntroStageState(stage);
  }, []);

  const loginUser = useCallback((email?: string) => {
    setIsAuthenticated(true);
    setUserEmail(email?.trim() || 'demo@fluid.app');
  }, []);

  const logoutUser = useCallback(() => {
    setIsAuthenticated(false);
    setUserEmail(null);
    setIntroStageState('ready');
  }, []);

  const replayIntro = useCallback(() => {
    setIsAuthenticated(false);
    setIntroStageState('splash');
  }, []);

  const value = useMemo<FilterContextType>(
    () => ({
      exploreHorizon,
      verifiedOnly,
      selectedTags,
      allAvailableTags: ALL_AVAILABLE_TAGS,
      introStage,
      isAuthenticated,
      userEmail,
      applyFilterState,
      resetFilterState,
      setIntroStage,
      replayIntro,
      loginUser,
      logoutUser,
      setExploreHorizon,
      setVerifiedOnly,
      setSelectedTags,
    }),
    [
      exploreHorizon,
      verifiedOnly,
      selectedTags,
      introStage,
      isAuthenticated,
      userEmail,
      applyFilterState,
      resetFilterState,
      setIntroStage,
      replayIntro,
      loginUser,
      logoutUser,
    ]
  );

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters(): FilterContextType {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
}

export default FilterProvider;
