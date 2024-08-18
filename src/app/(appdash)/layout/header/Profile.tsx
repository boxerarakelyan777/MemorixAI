import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@mui/material";

export default function Profile() {
  return (
    <>
      <SignedOut>
        <SignInButton>
          <Button
            variant="contained"
            color="primary"
            size="small"
          >
            Log in
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
}