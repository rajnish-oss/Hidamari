export interface OAuthProfile {
  id: string;
  emails: { value: string }[];
  displayName: string;
  photos?: { value: string }[];
}
