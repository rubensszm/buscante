export interface Livro {
    title?:               string;
    authors?:             string[];
    publisher?:           string;
    publishedDate?:       string;
    description?:         string;
    previewLink?:         string;
    thumbnail?:           ImageLinks;
}

export interface AccessInfo {
    country:                string;
    viewability:            string;
    embeddable:             boolean;
    publicDomain:           boolean;
    textToSpeechPermission: string;
    epub:                   Epub;
    pdf:                    PDF;
    accessViewStatus:       string;
}

export interface Epub {
    isAvailable:  boolean;
    acsTokenLink: string;
}

export interface PDF {
    isAvailable: boolean;
}

export interface SaleInfo {
    country:     string;
    saleability: string;
    isEbook:     boolean;
    listPrice:   Price;
    retailPrice: Price;
    buyLink:     string;
}

export interface Price {
    amount:       number;
    currencyCode: string;
}

export interface VolumeInfo {
    title:               string;
    authors:             string[];
    publisher:           string;
    publishedDate:       string;
    description:         string;
    pageCount:           number;
    dimensions:          Dimensions;
    printType:           string;
    mainCategory:        string;
    categories:          string[];
    averageRating:       number;
    ratingsCount:        number;
    contentVersion:      string;
    language:            string;
    infoLink:            string;
    canonicalVolumeLink: string;
}

export interface Dimensions {
    height:    string;
    width:     string;
    thickness: string;
}

export interface Item {
    volumeInfo: VolumeInfo
}

export interface LivrosResultado {
    items: Item[]
    totalItems: number
}

export interface ImageLinks {
    smallThumbnail: string;
    thumbnail:      string;
    small:          string;
    medium:         string;
    large:          string;
    extraLarge:     string;
}

