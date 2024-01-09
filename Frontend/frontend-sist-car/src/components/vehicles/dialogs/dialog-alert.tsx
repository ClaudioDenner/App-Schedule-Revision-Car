'use client'
import { AlertDialog, Flex } from "@radix-ui/themes"
import { TrashIcon } from "@radix-ui/react-icons"
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation'


export default function DialogAlertVehicle({nId, model, plate, clientName}:any){


    const router = useRouter();


    const toastSuccess = () => {
        toast.error("Registro de veículo deletado com sucesso, aguarde o reload", {
          position: toast.POSITION.BOTTOM_RIGHT,
          
          
        });
      };

      const toastError = (msg:string) => {
        toast.warn(`Parece que algo deu errado: ${msg}`, {
          position: toast.POSITION.BOTTOM_RIGHT,
          
        });
      };

    function redirect(){
        console.log('')
    }

    async function deleteClient(){
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/vehicles/${nId}`,{
            method:'DELETE',
        })
        .then((res)=>{
           if(res.status === 200){
            toastSuccess();
            setTimeout(()=> router.push('/fallback/vehicles'), 2500)

           } else{
            toastError('...')
           }
        })


    }



    return(
        <>
            
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                <button
                type="button"
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded inline-flex items-center m-1"
                >
                    
                    <TrashIcon/>
                </button>
            </AlertDialog.Trigger>
            <AlertDialog.Content style={{ maxWidth: 450 }}>
                <AlertDialog.Title>Atenção!</AlertDialog.Title>
                <AlertDialog.Description size="2">
                Você está prestes a remover permanentemente o registro do veículo <b>{model}</b>, de placa <b>{plate}</b>, pertencente ao proprietário <b>{clientName}</b> tem certeza?
                
                </AlertDialog.Description>

                <Flex gap="3" mt="4" justify="end">
                <AlertDialog.Cancel>
                    <button
                    className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
                    >
                    Cancelar
                    </button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                    <button 
                    className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
                    onClick={deleteClient}>
                    Apagar registro
                    </button>
                </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    )

}