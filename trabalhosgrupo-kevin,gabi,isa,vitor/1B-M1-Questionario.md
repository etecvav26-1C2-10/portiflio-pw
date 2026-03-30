 Vitor Moretti - Exercício 2 
Pergunta de aplicação
Considere o seguinte problema:

Um programa deve receber três números e mostrar qual deles é o maior.

Descreva um algoritmo em linguagem natural para resolver esse problema.
Se possível, represente esse algoritmo em pseudocódigo ou Portugol.

Primeiro é preciso saber o valor dos três numeros, depois, verificar se o primeiro é maior que os demais, assim como com o segundo e o terceiro. Também é preciso comparar os três numeros e verificar se todos são iguais. 

programa {
  funcao inicio() {
    
    inteiro num1 ,num2, num3

    escreva ("digite o primeiro numero ")
    leia (num1)
    limpa()

     escreva ("digite o segundo numero ")
    leia (num2)
    limpa()

     escreva ("digite o terceiro numero ")
    leia (num3)
    limpa()


  se (num1 == num2){
  	se (num1 == num3){
    escreva ("todos os numeros são iguais")
  	}
  }
  

  se (num1 > num2) {
    se (num1 > num3)
    {
      escreva ("o maior numero é " + num1)

    }
  }

  se (num2 > num1) {
    se (num2 > num3)
    {
      escreva ("o maior numero é " + num2)

    }
  }

  se (num3 > num2) {
    se (num3 > num1)
    {
      escreva ("o maior numero é " + num3)

    }
  }
    
      }
}
