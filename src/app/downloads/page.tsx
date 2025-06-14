import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

const LinkButton = ({ href, label }: { href: string; label: string }) => (
    <a
        href={href}
        target="_blank"
        className="block w-full px-4 py-2 rounded-lg border border-transparent hover:border-primary hover:bg-accent transition-colors flex items-center justify-between text-sm"
    >
        {label}
        <ExternalLink className="h-4 w-4 text-muted-foreground" />
    </a>
);

export default function Resources() {
    return (
        <div className="space-y-12">
            {/* Quran: The Final Testament */}
            <section className="space-y-6">
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <Image
                        src="https://www.masjidtucson.org/images/catalog/bQuranCoverThumb.jpg"
                        alt="Quran Cover"
                        className="rounded-lg w-32 md:w-40 shadow"
                    />
                    <div>
                        <h3 className="text-2xl font-semibold">Quran: The Final Testament</h3>
                        <p className="text-sm text-muted-foreground">Dr. Rashad Khalifa, Ph.D.</p>
                    </div>
                </div>
                <Tabs defaultValue="full-pdf">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="full-pdf">Full PDF</TabsTrigger>
                        <TabsTrigger value="appendices">Appendices</TabsTrigger>
                        <TabsTrigger value="physical-copies">Physical Copies</TabsTrigger>
                    </TabsList>

                    <TabsContent value="full-pdf">
                        <Card>
                            <CardHeader>
                                <CardTitle>Full PDF</CardTitle>
                                <CardDescription>
                                    Original English Edition by <a href="/submission/rashad-khalifa">Dr. Rashad Khalifa</a>
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {[
                                    ["English", "quran-the-final-testament"],
                                    ["Turkish", "quran-the-final-testament-turkish"],
                                    ["French", "quran-the-final-testament-french"],
                                    ["Persian", "quran-the-final-testament-persian"],
                                    ["Tamil", "quran-the-final-testament-tamil"],
                                    ["Hindi", "quran-the-final-testament-hindi"],
                                    ["Arabic (with English)", "quran-the-final-testament-with-arabic"],
                                ].map(([label, file], i) => (
                                    <LinkButton
                                        key={i}
                                        href={`https://library.wikisubmission.org/file/${file}`}
                                        label={label as string}
                                    />
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="appendices">
                        <Card>
                            <CardHeader>
                                <CardTitle>Appendices</CardTitle>
                                <CardDescription>
                                    From the original translation. See all <a href="/submission/appendices">38 appendices</a>.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {[
                                    ["English", "quran-the-final-testament-appendices"],
                                    ["Turkish", "quran-the-final-testament-appendices-turkish"],
                                    ["French", "quran-the-final-testament-appendices-french"],
                                    ["Persian", "quran-the-final-testament-appendices-persian"],
                                    ["Tamil", "quran-the-final-testament-appendices-tamil"],
                                    ["Hindi", "quran-the-final-testament-appendices-hindi"],
                                ].map(([label, file], i) => (
                                    <LinkButton
                                        key={i}
                                        href={`https://library.wikisubmission.org/file/${file}`}
                                        label={label as string}
                                    />
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="physical-copies">
                        <Card>
                            <CardHeader>
                                <CardTitle>Physical Copies</CardTitle>
                                <CardDescription>Order from online retailers.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <LinkButton
                                    href="https://www.masjidtucson.org/publications/catalog/index.html"
                                    label="Masjid Tucson"
                                />
                                <LinkButton
                                    href="https://www.barnesandnoble.com/w/quran-the-final-testament-authorized-english-version-dr-rashad-khalifa/1008697516"
                                    label="Barnes & Noble"
                                />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </section>

            {/* Visual Presentation */}
            <section className="space-y-4">
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <Image
                        src="https://www.masjidtucson.org/images/catalog/quran_VP_thumb.png"
                        alt="Quran VP Cover"
                        className="rounded-lg w-32 md:w-40 shadow"
                    />
                    <div>
                        <h3 className="text-2xl font-semibold">Visual Presentation of the Miracle</h3>
                        <p className="text-sm text-muted-foreground">Dr. Rashad Khalifa, Ph.D.</p>
                    </div>
                </div>
                <br />
                <a href="https://library.wikisubmission.org/file/visual-presentation-of-the-miracle" target="_blank">
                    <Button variant="outline">Download PDF</Button>
                </a>
            </section>

            {/* QHI */}
            <section className="space-y-4">
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <Image
                        src="https://www.masjidtucson.org/images/catalog/QHICoverThumb.jpg"
                        alt="QHI Cover"
                        className="rounded-lg w-32 md:w-40 shadow"
                    />
                    <div>
                        <h3 className="text-2xl font-semibold">Quran, Hadith, and Islam</h3>
                        <p className="text-sm text-muted-foreground">Dr. Rashad Khalifa, Ph.D.</p>
                    </div>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>PDF Versions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <LinkButton
                            href="https://library.wikisubmission.org/file/quran-hadith-and-islam-original"
                            label="Original PDF"
                        />
                        <LinkButton
                            href="https://library.wikisubmission.org/file/quran-hadith-and-islam"
                            label="Alternative Format"
                        />
                    </CardContent>
                </Card>
            </section>

            {/* The Computer Speaks */}
            <section className="space-y-4">
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <Image
                        src="https://www.masjidtucson.org/images/catalog/CompSpksCoverThumb.jpg"
                        alt="Computer Speaks Cover"
                        className="rounded-lg w-32 md:w-40 shadow"
                    />
                    <div>
                        <h3 className="text-2xl font-semibold">The Computer Speaks: God&apos;s Message to The World</h3>
                        <p className="text-sm text-muted-foreground">Dr. Rashad Khalifa, Ph.D.</p>
                    </div>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Original PDF</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <LinkButton
                            href="https://library.wikisubmission.org/file/the-computer-speaks"
                            label="Download PDF"
                        />
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}