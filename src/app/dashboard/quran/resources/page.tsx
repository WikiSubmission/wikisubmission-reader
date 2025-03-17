import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Resources() {
    return (
        <ContentLayout title="Resources">
            <div className="space-y-8">
                {/* Callout Section */}
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    This section contains various Submission-related resources.
                </div>

                {/* Quran: The Final Testament */}
                <section className="space-y-4">
                    <div className="md:flex items-center gap-3 space-y-4">
                        <img src="https://www.masjidtucson.org/images/catalog/bQuranCoverThumb.jpg" alt="Quran Cover" className="rounded-lg" />
                        <div className="flex flex-col">
                            <h3 className="text-3xl font-semibold">Quran: The Final Testament</h3>
                            <span className="text-md font-light text-slate-800 dark:text-slate-200">Dr. Rashad Khalifa, Ph.D.</span>
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
                                        Original English Edition by <a href="/submission/rashad-khalifa">Dr. Rashad Khalifa, Ph.D.</a>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">
                                        <a href="https://docs.wikisubmission.org/library/books/quran-the-final-testament" target="_blank" className="block p-2">
                                            English →
                                        </a>
                                        <a href="https://docs.wikisubmission.org/library/books/quran-the-final-testament-turkish" target="_blank" className="block p-2">
                                            Turkish →
                                        </a>
                                        <a href="https://docs.wikisubmission.org/library/books/quran-the-final-testament-french" target="_blank" className="block p-2">
                                            French →
                                        </a>
                                        <a href="https://docs.wikisubmission.org/library/books/quran-the-final-testament-persian" target="_blank" className="block p-2">
                                            Persian →
                                        </a>
                                        <a href="https://docs.wikisubmission.org/library/books/quran-the-final-testament-tamil" target="_blank" className="block p-2">
                                            Tamil →
                                        </a>
                                        <a href="https://docs.wikisubmission.org/library/books/quran-the-final-testament-hindi" target="_blank" className="block p-2">
                                            Hindi →
                                        </a>
                                        <a href="https://docs.wikisubmission.org/library/books/quran-the-final-testament-with-arabic" target="_blank" className="block p-2">
                                            Arabic (with English) →
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="appendices">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Appendices Only</CardTitle>
                                    <CardDescription>
                                        From the original translation, the <a href="/submission/appendices">38 Appendices</a> cover many key topics in Submission.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">
                                        <a href="https://docs.wikisubmission.org/library/books/quran-the-final-testament-appendices" target="_blank" className="block p-2">
                                            English →
                                        </a>
                                        <a href="https://docs.wikisubmission.org/library/books/quran-the-final-testament-appendices-turkish" target="_blank" className="block p-2">
                                            Turkish →
                                        </a>
                                        <a href="https://docs.wikisubmission.org/library/books/quran-the-final-testament-appendices-french" target="_blank" className="block p-2">
                                            French →
                                        </a>
                                        <a href="https://docs.wikisubmission.org/library/books/quran-the-final-testament-appendices-persian" target="_blank" className="block p-2">
                                            Persian →
                                        </a>
                                        <a href="https://docs.wikisubmission.org/library/books/quran-the-final-testament-appendices-tamil" target="_blank" className="block p-2">
                                            Tamil →
                                        </a>
                                        <a href="https://docs.wikisubmission.org/library/books/quran-the-final-testament-appendices-hindi" target="_blank" className="block p-2">
                                            Hindi →
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="physical-copies">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Physical Copies</CardTitle>
                                    <CardDescription>
                                        Purchase physical copies from these retailers.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">
                                        <a href="https://www.masjidtucson.org/publications/catalog/index.html" target="_blank" className="block p-2">
                                            Masjid Tucson →
                                        </a>
                                        <a href="https://www.barnesandnoble.com/w/quran-the-final-testament-authorized-english-version-dr-rashad-khalifa/1008697516" target="_blank" className="block p-2">
                                            Barnes & Noble →
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </section>

                {/* Visual Presentation of the Miracle */}
                <section className="space-y-4">
                    <div className="md:flex items-center gap-3 space-y-4">
                        <img src="https://www.masjidtucson.org/images/catalog/quran_VP_thumb.png" alt="Quran Cover" className="rounded-lg" />
                        <div className="flex flex-col">
                            <h3 className="text-3xl font-semibold">Visual Presentation of the Miracle</h3>
                            <span className="text-md font-light text-slate-800 dark:text-slate-200">Dr. Rashad Khalifa, Ph.D.</span>
                        </div>
                    </div>
                    <br />
                    <a href="https://docs.wikisubmission.org/library/books/visual-presentation-of-the-miracle" target="_blank">
                        <Button variant="outline">
                            PDF →
                        </Button>
                    </a>
                </section>

                {/* Quran, Hadith, and Islam Section */}
                <section className="space-y-4 mb-8">
                    <div className="md:flex items-center gap-3 space-y-4">
                        <img
                            src="https://www.masjidtucson.org/images/catalog/QHICoverThumb.jpg"
                            alt="QHI Cover"
                            className="rounded-lg"
                            width={150}
                            height={200}
                        />
                        <div className="flex flex-col">
                            <h3 className="text-3xl font-semibold">Quran, Hadith, and Islam</h3>
                            <span className="text-md font-light text-slate-800 dark:text-slate-200">
                                Dr. Rashad Khalifa, Ph.D.
                            </span>
                        </div>
                    </div>
                    <br />
                    <Card>
                        <CardHeader>
                            <CardTitle>PDF Versions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <a
                                href="https://docs.wikisubmission.org/library/books/quran-hadith-and-islam-original"
                                target="_blank"
                                className="block p-2"
                            >
                                Original PDF →
                            </a>
                            <a
                                href="https://docs.wikisubmission.org/library/books/quran-hadith-and-islam"
                                target="_blank"
                                className="block p-2"
                            >
                                Alternative Format →
                            </a>
                        </CardContent>
                    </Card>
                </section>

                {/* The Computer Speaks: Gods Message to The World Section */}
                <section className="space-y-4 mb-8">
                    <div className="md:flex items-center gap-3 space-y-4">
                        <img
                            src="https://www.masjidtucson.org/images/catalog/CompSpksCoverThumb.jpg"
                            alt="Computer Speaks Cover"
                            className="rounded-lg"
                            width={150}
                            height={200}
                        />
                        <div className="flex flex-col">
                            <h3 className="text-3xl font-semibold">The Computer Speaks: God&aposs Message to The World</h3>
                            <span className="text-md font-light text-slate-800 dark:text-slate-200">
                                Dr. Rashad Khalifa, Ph.D.
                            </span>
                        </div>
                    </div>
                    <br />
                    <Card>
                        <CardHeader>
                            <CardTitle>Original PDF</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <a
                                href="https://docs.wikisubmission.org/library/books/the-computer-speaks"
                                target="_blank"
                                className="block p-2"
                            >
                                Download PDF →
                            </a>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </ContentLayout>
    );
}
