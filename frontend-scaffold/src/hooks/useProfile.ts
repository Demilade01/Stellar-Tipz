import { useProfileStore } from '../store/profileStore';

/**
 * Hook to access the current user's profile and loading state.
 */
export const useProfile = () => {
  const { profile, loading, error } = useProfileStore();

  return {
    profile,
    loading,
    error,
    hasProfile: !!profile,
  };
};
