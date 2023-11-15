async function enviarScript(scriptText){
	// Divide o texto do script em linhas, remove espaços em branco e filtra linhas vazias.
	const lines = scriptText.split(/[\n\t]+/).map(line => line.trim()).filter(line => line);

	// Encontra os elementos HTML relevantes na página.
	main = document.querySelector("#main"),
	textarea = main.querySelector(`div[contenteditable="true"]`);

	// Se não encontrar o elemento textarea, lança um erro.
	if (!textarea) throw new Error("Não há uma conversa aberta");

	// Itera sobre as linhas do script.
	for (const line of lines) {
		console.log(line); // Exibe a linha atual no console.

		// Coloca o foco no elemento textarea.
		textarea.focus();

		// Insere o conteúdo da linha no textarea simulando a digitação.
		document.execCommand('insertText', false, line);

		// Dispara um evento 'change' no textarea para simular a alteração de conteúdo.
		textarea.dispatchEvent(new Event('change', {bubbles: true}));

		// Aguarda 100 milissegundos e clica no botão 'Enviar' no chat.
		setTimeout(() => {
			(main.querySelector(`[data-testid="send"]`) || main.querySelector(`[data-icon="send"]`)).click();
		}, 100);

		// Se a linha atual não for a última, aguarda 250 milissegundos antes de enviar a próxima.
		if (lines.indexOf(line) !== lines.length - 1) await new Promise(resolve => setTimeout(resolve, 250));
	}

	// Retorna o número total de linhas processadas.
	return lines.length;
}

// Chama a função 'enviarScript' com um script de exemplo.
enviarScript(`
Insira a mensagem aqui`)
	.then(e => console.log(`Código finalizado, ${e} mensagens enviadas`)) // Exibe a quantidade de mensagens enviadas no console quando a função é concluída com sucesso.
	.catch(console.error); // Exibe um erro no console se ocorrer algum erro durante a execução.
