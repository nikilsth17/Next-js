import { For, Stack, Timeline } from "@chakra-ui/react"
import {
    TimelineConnector,
    TimelineContent,
    TimelineItem,
    TimelineRoot,
    TimelineTitle,
} from "@/components/ui/timeline"
import React from 'react'

function Education() {
    return (
        <div className="p-4">
            <h6 className="text-xl">Education & <span className="text-green-800">Experience</span></h6>
            <Stack gap="8">
                <For each={["sm", "md", "lg"]}>
                    {(size) => (
                        <TimelineRoot size={size} key={size}>
                            <TimelineItem>
                                <TimelineContent width="auto">
                                    <TimelineTitle whiteSpace="nowrap">Nov 1994</TimelineTitle>
                                </TimelineContent>
                                <TimelineConnector>1</TimelineConnector>
                                <Timeline.Content>
                                    <TimelineTitle>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    </TimelineTitle>
                                </Timeline.Content>
                            </TimelineItem>

                            <TimelineItem>
                                <TimelineContent width="auto">
                                    <TimelineTitle whiteSpace="nowrap">Nov 2010</TimelineTitle>
                                </TimelineContent>
                                <TimelineConnector>2</TimelineConnector>
                                <TimelineContent>
                                    <TimelineTitle>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    </TimelineTitle>
                                </TimelineContent>
                            </TimelineItem>
                        </TimelineRoot>
                    )}
                </For>
            </Stack>
        </div>


    )
}

export default Education