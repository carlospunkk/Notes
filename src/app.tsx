
import { ChangeEvent, useState } from 'react'
import logo from './assets/logo-nlw-expert.svg'
import { NoteCard } from './components/note-card'
import { NewNoteCard } from './components/new-note-card'

interface Note {
    id:string 
    date:Date 
    content:string 
}


export function App() {
    // BUSCA usestate 
    const [search,setSearch]=useState('')
    const [notes, setNotes] = useState<Note[]> ( () => {

        
        // PEGANDO O VALOR NO LOCAL STORAGE
        const notesOnStorage = localStorage.getItem('notes')
        if(notesOnStorage){
            return JSON.parse(notesOnStorage)
        }
            return[]
    })

    function onNoteCreated(content:string){

        const newNote = {
            id:crypto.randomUUID(),
            date:new Date(),
            content,
        }
        
        const NotesArray = [newNote,...notes]
        setNotes(NotesArray)

        // SETANDO LOCAL STORAGE 
        localStorage.setItem('notes',JSON.stringify(NotesArray))
    }
// evento busca
    function handleSearch(event:ChangeEvent <HTMLInputElement>){
        const query = event.target.value
        setSearch(query)
    }
    function onNoteDeleted(id:string){
        const notesArray = notes.filter( note => {
            return note.id != id
        })
        setNotes(notesArray)
        localStorage.setItem('notes',JSON.stringify(notesArray))
    }
      
    // filtrar a busca 

    const FilterNotes = search != '' 
    ? notes.filter(note => note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    : notes


    return (
        <div className="mx-auto max-w-6xl my-10 space-y-6 px-5 ">
            <img src={logo} alt='logo'></img>
            
            <form  className='w-full'>
        <input
            type='text'
            placeholder='Busque em suas Notas...'
            className='w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500m '
            onChange={handleSearch}
        />
    </form>
            {/*linha*/}
            <div className='h-px bg-slate-700 '></div>

            <div className='grid md-cols-1 md:gri-cols-2 lg:grid-cols-3 auto-rows-[250px] gap-6 '>

                <NewNoteCard  onNoteCreated={onNoteCreated} />

                {FilterNotes.map(note => {
                    return <NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted}/>
                })}

            </div>
        </div>
    )
}







