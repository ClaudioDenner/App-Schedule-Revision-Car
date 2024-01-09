'use client'
import ListClients from "@/components/clients/list-clients"
import FormClient from "@/components/clients/form-client"
import { Tabs, Box, Flex } from "@radix-ui/themes"

export default function Clients(){
    return(
        <>
            <div className="w-full flex  items-center justify-center p-4">
                <Flex direction="column" gap="4" width={'100%'}>
                    <Tabs.Root defaultValue="tab1">
                            <Tabs.List>
                                <Tabs.Trigger value="tab1">Lista de Clientes</Tabs.Trigger>
                                <Tabs.Trigger value="tab2">Cadastrar Cliente</Tabs.Trigger>
                            </Tabs.List>

                            <Box px="2" pt="2" pb="2" width={'100%'}>
                                <Tabs.Content value="tab1">
                                    <ListClients />
                                </Tabs.Content>

                                <Tabs.Content value="tab2">
                                    <FormClient />
                                </Tabs.Content>
                            </Box>
                    </Tabs.Root>
                </Flex>
            </div>
        </>


        
    )
}

