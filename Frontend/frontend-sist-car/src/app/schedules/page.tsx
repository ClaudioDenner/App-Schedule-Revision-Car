'use client'
import ListSchedules from "@/components/schedules/list-schedules"
import FormSchedule from "@/components/schedules/form-schedule"
import { Tabs, Box, Flex } from "@radix-ui/themes"

export default function Clients(){
    return(
        <>
            <div className="w-full flex  items-center justify-center p-4">
                <Flex direction="column" gap="4" width={'100%'}>
                    <Tabs.Root defaultValue="tab1">
                            <Tabs.List>
                                <Tabs.Trigger value="tab1">Lista de Agendamentos</Tabs.Trigger>
                                <Tabs.Trigger value="tab2">Cadastrar Agendamento</Tabs.Trigger>
                            </Tabs.List>

                            <Box px="2" pt="2" pb="2" width={'100%'}>
                                <Tabs.Content value="tab1">
                                    <ListSchedules />
                                </Tabs.Content>

                                <Tabs.Content value="tab2">
                                    <FormSchedule />
                                </Tabs.Content>
                            </Box>
                    </Tabs.Root>
                </Flex>
            </div>
        </>


        
    )
}

