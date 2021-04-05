# Your code here!

controlFlag = true
lista = [1, 6,8, 5, 3, 4]

for item in lista
    if controlFlag
        puts item
        if item == 5 
            controlFlag = false
        end
    end
end



puts "Sin controlFlag"

for item in lista
    puts item
    if item == 5 
        break
    end
end 


puts "Return"


def getItems(lista)
    for item in lista
        if controlFlag
            puts item
            if item == 5 
                controlFlag = false
            end
        end
    end
end
    



def getItems(lista)
    for item in lista
        puts item
        if item == 5
            return
        end
    end
end

getItems(lista)