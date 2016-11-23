import * as ts from 'typescript';
import {IRuleMetadata, Rules, RuleFailure, RuleWalker} from 'tslint';

export class Rule extends Rules.AbstractRule {
	public static metadata: IRuleMetadata	= {
		ruleName: 'promise-async',
		description: 'Requires any function/method that returns a promise to be marked async.',
		descriptionDetails: 'Error handling consistency.',
		optionsDescription: 'Not configurable.',
		options: null,
		optionExamples: ['true'],
		type: 'functionality',
		typescriptOnly: false
	};

	public static FAILURE_STRING: string	= 'functions that return promises must be async';

	private static isAsync (text: string) : boolean {
		return text.split(/[\(=]/)[0].match(/\s?async\s+?/) !== null;
	}

	private static isPromise (type: ts.TypeNode) : boolean {
		return type.getText().indexOf('Promise<') === 0;
	}

	public static isCompliant (node: ts.FunctionExpression|ts.MethodDeclaration) : boolean {
		return Rule.isAsync(node.getText()) || !Rule.isPromise(node.type);
	}


	public apply (sourceFile: ts.SourceFile) : RuleFailure[] {
		return this.applyWithWalker(
			new PromiseAsyncWalker(sourceFile, this.getOptions())
		);
	}
}

class PromiseAsyncWalker extends RuleWalker {
	public visitFunctionExpression (node: ts.FunctionExpression) : void {
		try {
			if (Rule.isCompliant(node)) {
				return;
			}

			this.addFailure(
				this.createFailure(
					node.getStart(),
					node.getWidth(),
					Rule.FAILURE_STRING
				)
			);
		}
		finally {
			super.visitFunctionExpression(node);
		}
	}

	public visitMethodDeclaration (node: ts.MethodDeclaration) : void {
		try {
			if (Rule.isCompliant(node)) {
				return;
			}

			this.addFailure(
				this.createFailure(
					node.getStart(),
					node.getWidth(),
					Rule.FAILURE_STRING
				)
			);
		}
		finally {
			super.visitMethodDeclaration(node);
		}
	}
}
