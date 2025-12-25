import { useState } from "react";

export function useIdentity<T extends IdentityEntity>(){
    const [isLoading, setIsLoading] = useState<Boolean>(false);

    return [isLoading]
}