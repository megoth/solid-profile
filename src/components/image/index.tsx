import {useResource} from "@ldo/solid-react";
import {HTMLAttributes, useMemo} from "react";
import {Leaf} from "@ldo/solid";

interface Props extends HTMLAttributes<HTMLImageElement> {
    alt: string
    src: string
}

export default function Image({alt, src, ...props}: Props) {
    const imageResource = useResource(src) as Leaf;
    const blobUrl = useMemo(() => {
        if (imageResource && imageResource.isBinary()) {
            return URL.createObjectURL(imageResource.getBlob()!);
        }
        return undefined;
    }, [imageResource]);
    return <img src={blobUrl} alt={alt} {...props} />
}